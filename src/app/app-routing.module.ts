import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LatestComponent } from './latest/latest.component';
import { LastMonthComponent } from './last-month/last-month.component';
import { TopFiveComponent } from './top-five/top-five.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/currency/latest' },
  { path: 'currency/latest', component: LatestComponent },
  { path: 'currency/last-month', component: LastMonthComponent },
  { path: 'currency/top-five', component: TopFiveComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/currency/latest' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
