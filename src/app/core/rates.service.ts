import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import uniqBy from 'lodash/uniqBy';
import { Decimal } from 'decimal.js';

import { DateService } from './date.service';
import { SortingService } from './sorting.service';

import { IDailyRatesResponse, IMonthlyRatesResponse, ILatestRates } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  private baseURL = 'https://api.exchangeratesapi.io'

  private _baseCurrency$ = new BehaviorSubject('EUR');
  private _baseCurrency  = 'EUR'

  private _exchangeCurrency$ = new BehaviorSubject('USD');
  private _exchangeCurrency = 'USD'

  constructor(
    private http: HttpClient,
    private dateService: DateService,
    private sortingService: SortingService
  ) { }

  public getBaseCurrency(): Observable<string> {
    return this._baseCurrency$;
  }

  public setBaseCurrency(value: string) {
    this._baseCurrency$.next(value.toUpperCase());
    this._baseCurrency = value.toUpperCase();
  }

  public getExchangeCurrency(): Observable<string> {
    return this._exchangeCurrency$;
  }

  public setExchangeCurrency(value: string) {
    this._exchangeCurrency$.next(value.toUpperCase());
    this._exchangeCurrency = value.toUpperCase();
  }

  getCurrentAndPreviousRates() {
    return forkJoin([this.getCurrentRatesRequest(), this.getPreviousRatesRequest()]);
  }

  getCurrenctAndMonthlyRates() {
    return forkJoin([this.getCurrentRatesRequest(), this.getMonthlyRatesRequest()]);
  }

  generateTodaysRate(
    currentRates: IDailyRatesResponse,
    previousRates: IDailyRatesResponse
  ): ILatestRates[] {
    const latestRates: ILatestRates[] = [];

    for(const currency in currentRates.rates) {
      const currentRate = new Decimal(currentRates.rates[currency]);
      const oldRate = new Decimal(previousRates.rates[currency]);
      const diff = currentRate.minus(oldRate);
      const diffPercentage = diff.dividedBy(oldRate).times(100);

      latestRates.push({
        symbol: currency,
        currentRate: currentRate.toNumber(),
        oldRate: oldRate.toNumber(),
        diff: diff.toNumber(),
        diffPercentage: diffPercentage.toNumber()
      });
    }

    return latestRates.sort(this.sortingService.compareByKey('symbol'));
  }

  generateMontlyRates(monthlyRates: IMonthlyRatesResponse) {
    const labels = Object.keys(monthlyRates.rates).sort();
    const data = labels.map(date => monthlyRates.rates[date][this._exchangeCurrency]);
    const datasets = [{
      label: `${this._baseCurrency} vs. ${this._exchangeCurrency}`,
      data,
      borderColor: data[0] > data[data.length - 1] ? '#ff0000' : '#00ff00',
      fill: false
    }];

    return { labels, datasets };
  }

  getAvailableRates(currentRate: IDailyRatesResponse) {
    return uniqBy([
      { label: this._baseCurrency, value: this._baseCurrency },
      ...Object.keys(currentRate.rates).map(rate => ({ label: rate, value: rate}))
    ].sort(this.sortingService.compareByKey('label')), 'label');
  }

  // Requests
  private getCurrentRatesRequest(): Observable<IDailyRatesResponse> {
    return this.http.get<IDailyRatesResponse>(this.baseURL + `/latest?base=${this._baseCurrency}`)
      .pipe(catchError(this.handleError));
  }

  private getPreviousRatesRequest(): Observable<IDailyRatesResponse>{
    return this.http.get<IDailyRatesResponse>(this.baseURL + `/${this.dateService.getLastWeekDay()}?base=${this._baseCurrency}`)
      .pipe(catchError(this.handleError));
  }

  private getMonthlyRatesRequest(): Observable<IMonthlyRatesResponse>{
    return this.http.get<IMonthlyRatesResponse>(this.baseURL + `/history?start_at=${this.dateService.getLastMonthDate()}&end_at=${this.dateService.getToday()}&base=${this._baseCurrency}&symbols=${this._exchangeCurrency}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
  }
}
