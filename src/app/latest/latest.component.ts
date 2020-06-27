import { Component, OnInit } from '@angular/core';
import { RatesService } from '../core/rates.service';

import { ILatestRates } from '../shared/interfaces';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {
  public latestRates: ILatestRates[] = [];
  public availableRates: string[] = [];
  public show = true;

  constructor(private ratesService: RatesService) { }

  ngOnInit(): void {
    this.ratesService.getCurrentAndPreviousRates().subscribe(([currentRates, previousRates]) => {
      this.latestRates = this.ratesService.generateTodaysRate(currentRates, previousRates);
      this.availableRates = this.ratesService.getAvailableRates(currentRates)
    })
  }
}
