import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LatestComponent } from './latest.component';

@NgModule({
  declarations: [
    LatestComponent
  ],
  imports: [
    TableModule,
    CommonModule
  ],
  exports: [
    LatestComponent
  ]
})
export class LatestMoudule {}
