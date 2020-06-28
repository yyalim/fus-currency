import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { SelectCurrencyComponent } from './select-currency/select-currency.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      DropdownModule,
      BrowserAnimationsModule
    ],
    declarations: [
      SelectCurrencyComponent
    ],
    exports: [
      SelectCurrencyComponent
    ]
})
export class SharedModule { }