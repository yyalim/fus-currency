import { Component, OnInit } from '@angular/core';
import { RatesService } from './core/rates.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public baseCurrency: string;
  public exchangeCurrency: string;

  constructor(
    private ratesService: RatesService
  ) { }

  ngOnInit() {
    this.ratesService.getBaseCurrency().subscribe(value => this.baseCurrency = value);
    this.ratesService.getExchangeCurrency().subscribe(value => this.exchangeCurrency = value);
  }
}
