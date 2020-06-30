import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import every from 'lodash/every' ;

import { RatesService } from '../core/rates.service';
import { SortingService } from '../core/sorting.service';
import { DateService } from '../core/date.service';

import { ILatestRates, IAvailableRate } from '../shared/interfaces';

@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./top-five.component.scss']
})
export class TopFiveComponent implements OnInit {
  public latestRates: ILatestRates[] = [];
  public topFive: ILatestRates[] = [];
  public availableRates: IAvailableRate[] = [];
  public baseCurrency: string;
  public order: 'asc' | 'desc' = 'desc';

  constructor(
    private ratesService: RatesService,
    private sortingService: SortingService,
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ratesService.setBaseCurrency(params.get('base'));
    });

    this.ratesService.getBaseCurrency().subscribe(value => this.baseCurrency = value);
    this.fetchData(this.dateService.getLastWeekDay());
  }

  handleCurrencyChange(selectedCurrency: string) {
    this.router.navigateByUrl(`/currency/top-five/${selectedCurrency}`);
    this.fetchData(this.dateService.getLastWeekDay());
  }

    setOrderAsc() {
    this.order = 'asc';
    this.setTopFive();
  }

  setOrderDesc() {
    this.order = 'desc';
    this.setTopFive();
  }

  private fetchData(lastRateDay: string) {
    this.ratesService.getCurrentAndPreviousRates(lastRateDay).subscribe(([currentRates, previousRates]) => {
      const latestRates = this.ratesService.generateTodaysRate(currentRates, previousRates);
      this.availableRates = this.ratesService.getAvailableRates(currentRates);

      if(this.ratesService.isRatesChanged(latestRates)){
        this.latestRates = latestRates;
        this.setTopFive()
      } else {
        this.fetchData(this.dateService.getLastWeekDay(lastRateDay))
      }
    })
  }

  private setTopFive() {
    this.topFive = this.latestRates
      .sort(this.sortingService.compareByKey('diff', this.order))
      .slice(0, 5);
  }
}
