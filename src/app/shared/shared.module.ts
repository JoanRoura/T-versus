import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
