import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LatestComponent } from './latest/latest.component';
import { LastMonthComponent } from './last-month/last-month.component';
import { TopFiveComponent } from './top-five/top-five.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'currency/latest/EUR' },
  { path: 'currency/latest/:base', component: LatestComponent },
  { path: 'currency/last-month/:base/:exchange', component: LastMonthComponent },
  { path: 'currency/top-five/:base', component: TopFiveComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/currency/latest/eur' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
