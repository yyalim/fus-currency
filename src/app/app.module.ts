import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LatestMoudule } from './latest/latest.module';
import { LastMonthModule } from './last-month/last-month.module';
import { TopFiveModule } from './top-five/top-five.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LastMonthModule,
    LatestMoudule,
    TopFiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
