import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TopFiveComponent } from './top-five.component';
import {ButtonModule} from 'primeng/button';
import { SharedModule } from  '../shared/shared.module'

@NgModule({
  declarations: [
    TopFiveComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    SharedModule
  ],
  exports: [
    TopFiveComponent
  ]
})
export class TopFiveModule {}
