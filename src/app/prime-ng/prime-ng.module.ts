import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    CardModule,
    DividerModule
  ]
 
})
export class PrimeNgModule { }
