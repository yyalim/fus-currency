import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { LastMonthComponent } from './last-month.component';
import { SharedModule } from  '../shared/shared.module';

@NgModule({
  declarations: [
    LastMonthComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    SharedModule
  ],
  exports: [
    LastMonthComponent
  ]
})
export class LastMonthModule {}
