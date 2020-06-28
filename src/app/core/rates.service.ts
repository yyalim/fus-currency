import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import uniqBy from 'lodash/uniqBy';

import { DateService } from './date.service';
import { SortingService } from './sorting.service';

import { IDailyRatesResponse, ILatestRates } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  private baseURL = 'https://api.exchangeratesapi.io'

  private _baseCurrency$ = new BehaviorSubject('EUR');
  private _baseCurrency  = 'EUR'

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


  getCurrentAndPreviousRates() {
    return forkJoin([this.getCurrentRatesRequest(), this.getPreviousRatesRequest()]);
  }

  generateTodaysRate(
    currentRates: IDailyRatesResponse,
    previousRates: IDailyRatesResponse
  ): ILatestRates[] {
    const latestRates: ILatestRates[] = [];

    for(const currency in currentRates.rates) {
      const currentRate = currentRates.rates[currency];
      const oldRate = previousRates.rates[currency];
      const diff = currentRate - oldRate;
      const diffPercentage = diff / oldRate * 100

      latestRates.push({
        symbol: currency,
        currentRate,
        oldRate,
        diff,
        diffPercentage
      });
    }

    return latestRates.sort(this.sortingService.compareByKey('symbol'));
  }

  getAvailableRates(currentRate: IDailyRatesResponse) {
    return uniqBy([
      { label: this._baseCurrency, value: this._baseCurrency },
      ...Object.keys(currentRate.rates).map(rate => ({ label: rate, value: rate}))
    ].sort(this.sortingService.compareByKey('label')), 'label');
  }

  private getCurrentRatesRequest(): Observable<IDailyRatesResponse> {
    return this.http.get<IDailyRatesResponse>(this.baseURL + `/latest?base=${this._baseCurrency}`)
      .pipe(catchError(this.handleError));
  }

  private getPreviousRatesRequest(): Observable<IDailyRatesResponse>{
    return this.http.get<IDailyRatesResponse>(this.baseURL + `/${this.dateService.getLastWeekDay()}?base=${this._baseCurrency}`)
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
