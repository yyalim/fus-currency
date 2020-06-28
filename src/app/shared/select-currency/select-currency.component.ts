import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAvailableRate } from '../interfaces';
import { RatesService } from '../../core/rates.service';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.scss']
})
export class SelectCurrencyComponent implements OnInit {
  public baseCurrency;

  @Input()
  public availableRates: IAvailableRate[] = [];

  @Output()
  onCurrencyChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private ratesService: RatesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ratesService.getBaseCurrency().subscribe(value => this.baseCurrency = value)

    this.route.paramMap.subscribe(params => {
      this.ratesService.setBaseCurrency(params.get('base'));
    });
  }

  onChange(event) {
    const selectedCurrency = event.value;
    this.ratesService.setBaseCurrency(event.value);
    this.onCurrencyChange.emit(event.value);
  }
}
