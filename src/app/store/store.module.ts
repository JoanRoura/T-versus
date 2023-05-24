import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreItemCardComponent } from './components/store-item-card/store-item-card.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { HomeStoreComponent } from './pages/home-store/home-store.component';
import { BuytokesPageComponent } from './pages/buytokes-page/buytokes-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StoreItemCardComponent,
    PaymentPageComponent,
    HomeStoreComponent,
    BuytokesPageComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule
  ]
})
export class StoreModule { }
