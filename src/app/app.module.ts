import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LastMonthComponent } from './last-month/last-month.component';
import { TopFiveComponent } from './top-five/top-five.component';

import { AppRoutingModule } from './app-routing.module';
import { LatestMoudule } from './latest/latest.module';

import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LastMonthComponent,
    TopFiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LatestMoudule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
