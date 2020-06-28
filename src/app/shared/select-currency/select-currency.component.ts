import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAvailableRate } from '../interfaces';
import { RatesService } from '../../core/rates.service';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.scss']
})
export class SelectCurrencyComponent implements OnInit {
  public currency;

  @Input()
  public availableRates: IAvailableRate[] = [];

  @Input()
  public currencyPosition: 'base' | 'exchange';

  @Output()
  onCurrencyChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private ratesService: RatesService
  ) { }

  ngOnInit(): void {

    if(this.currencyPosition === 'base') {
      this.ratesService.getBaseCurrency().subscribe(value => this.currency = value);
    } else {
      this.ratesService.getExchangeCurrency().subscribe(value => this.currency = value);
    }
  }

  onChange(event) {
    if(this.currencyPosition === 'base') {
      this.ratesService.setBaseCurrency(event.value);
    } else {
      this.ratesService.setExchangeCurrency(event.value);
    }

    this.onCurrencyChange.emit(event.value);
  }
}
