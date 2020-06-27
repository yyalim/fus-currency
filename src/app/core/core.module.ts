import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RatesService } from './rates.service';
import { DateService } from './date.service';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [ RatesService, DateService ]
})
export class CoreModule { }