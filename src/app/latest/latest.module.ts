import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { LatestComponent } from './latest.component';
import { SharedModule } from  '../shared/shared.module'

@NgModule({
  declarations: [
    LatestComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    LatestComponent
  ]
})
export class LatestMoudule {}
