import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RatesService } from '../core/rates.service';
import { IAvailableRate } from '../shared/interfaces';

@Component({
  selector: 'app-last-month',
  templateUrl: './last-month.component.html',
  styleUrls: ['./last-month.component.scss']
})
export class LastMonthComponent implements OnInit {
  public baseCurrency: string;
  public excahngeCurrency: string;
  public availableRates: IAvailableRate[] = [];
  public data: any;
  public options = {
    elements: {
      line: {
        tension: 0
      }
    }
  };

  constructor(
    private ratesService: RatesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ratesService.setBaseCurrency(params.get('base'));
      this.ratesService.setExchangeCurrency(params.get('exchange'));
    });

    this.ratesService.getBaseCurrency().subscribe(value => this.baseCurrency = value);
    this.ratesService.getExchangeCurrency().subscribe(value => this.excahngeCurrency = value);

    this.fetchData();
  }

  fetchData() {
    this.ratesService.getCurrenctAndMonthlyRates().subscribe(([currentRates, monthlyRates]) => {
      this.availableRates = this.ratesService.getAvailableRates(currentRates);
      this.data = this.ratesService.generateMontlyRates(monthlyRates);
    });
  }

  handleBaseCurrencyChange(selectedCurrency: string) {
    this.router.navigateByUrl(`/currency/last-month/${selectedCurrency}/${this.excahngeCurrency}`);
    this.fetchData();
  }

  handleExchangeCurrencyChange(selectedCurrency: string) {
    this.router.navigateByUrl(`/currency/last-month/${this.baseCurrency}/${selectedCurrency}`);
    this.fetchData();
  }
}
