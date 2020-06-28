import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RatesService } from './rates.service';
import { DateService } from './date.service';
import { SortingService } from './sorting.service';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [ RatesService, DateService, SortingService ]
})
export class CoreModule { }