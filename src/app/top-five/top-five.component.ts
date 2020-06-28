import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RatesService } from '../core/rates.service';
import { SortingService } from '../core/sorting.service';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ratesService.setBaseCurrency(params.get('base'));
    });

    this.ratesService.getBaseCurrency().subscribe(value => this.baseCurrency = value);
    this.fetchData();
  }

  handleCurrencyChange(selectedCurrency: string) {
    this.router.navigateByUrl(`/currency/top-five/${selectedCurrency}`);
    this.fetchData();
  }

  setOrderAsc() {
    this.order = 'asc';
    this.setTopFive();
  }

  setOrderDesc() {
    this.order = 'desc';
    this.setTopFive();
  }

  private fetchData() {
    this.ratesService.getCurrentAndPreviousRates().subscribe(([currentRates, previousRates]) => {
      this.latestRates = this.ratesService.generateTodaysRate(currentRates, previousRates);
      this.availableRates = this.ratesService.getAvailableRates(currentRates);

      this.setTopFive()
    })
  }

  private setTopFive() {
    this.topFive = this.latestRates
      .sort(this.sortingService.compareByKey('diff', this.order))
      .slice(0, 5);
  }
}
