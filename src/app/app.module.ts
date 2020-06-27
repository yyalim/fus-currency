import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LatestComponent } from './latest/latest.component';
import { LastMonthComponent } from './last-month/last-month.component';
import { TopFiveComponent } from './top-five/top-five.component';

@NgModule({
  declarations: [
    AppComponent,
    LatestComponent,
    LastMonthComponent,
    TopFiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
