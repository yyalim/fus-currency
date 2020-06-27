import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { DateService } from './date.service';

import { IDailyRatesResponse, ILatestRates } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RatesService {
  private baseURL = 'https://api.exchangeratesapi.io'

  // default currency is EURO
  private base:string = 'EUR'

  constructor(
    private http: HttpClient,
    private dateService: DateService
  ) { }

  private getCurrentRates(): Observable<IDailyRatesResponse> {
    return this.http.get<IDailyRatesResponse>(this.baseURL + `/latest?base=${this.base}`)
      .pipe(catchError(this.handleError));
  }

  private getPreviousRates(): Observable<IDailyRatesResponse>{
    return this.http.get<IDailyRatesResponse>(this.baseURL + `/${this.dateService.getLastWeekDay()}`)
      .pipe(catchError(this.handleError));
  }

  getCurrentAndPreviousRates() {
    return forkJoin([this.getCurrentRates(), this.getPreviousRates()]);
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

    return latestRates;
  }

  getAvailableRates(currentRate: IDailyRatesResponse) {
    return Object.keys(currentRate.rates);
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
