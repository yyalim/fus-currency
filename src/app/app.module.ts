import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LastMonthComponent } from './last-month/last-month.component';
import { TopFiveComponent } from './top-five/top-five.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LatestMoudule } from './latest/latest.module';
import { LastMonthModule } from './last-month/last-month.module';

@NgModule({
  declarations: [
    AppComponent,
    TopFiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LastMonthModule,
    LatestMoudule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
