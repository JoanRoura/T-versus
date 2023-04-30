import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';

@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    CardModule,
    DividerModule,
    StepsModule,
  ]

})
export class PrimeNgModule { }
