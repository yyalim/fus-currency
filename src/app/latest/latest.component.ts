import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RatesService } from '../core/rates.service';

import { ILatestRates, IAvailableRate } from '../shared/interfaces';
import { DateService } from '../core/date.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {
  public latestRates: ILatestRates[] = [];
  public availableRates: IAvailableRate[] = [];
  public baseCurrency: string;

  constructor(
    private ratesService: RatesService,
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
    this.router.navigateByUrl(`/currency/latest/${selectedCurrency}`);
    this.fetchData(this.dateService.getLastWeekDay());
  }

  private fetchData(lastRateDay: string) {
    this.ratesService.getCurrentAndPreviousRates(lastRateDay).subscribe(([currentRates, previousRates]) => {
      const latestRates = this.ratesService.generateTodaysRate(currentRates, previousRates);
      this.availableRates = this.ratesService.getAvailableRates(currentRates)

      if(this.ratesService.isRatesChanged(latestRates)){
        this.latestRates = latestRates;
      } else {
        this.fetchData(this.dateService.getLastWeekDay(lastRateDay))
      }
    })
  }
}
