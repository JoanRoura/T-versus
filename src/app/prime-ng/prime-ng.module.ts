import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    CardModule,
    DividerModule,
    StepsModule,
    SidebarModule    
  ]
})
export class PrimeNgModule { }
