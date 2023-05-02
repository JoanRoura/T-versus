import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { HomeStoreComponent } from './pages/home-store/home-store.component';
import { BuytokesPageComponent } from './pages/buytokes-page/buytokes-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeStoreComponent,
    children: [
      {
        path: 'buy-tokens',
        component: BuytokesPageComponent
      },
      {
        path: 'payment',
        component: PaymentPageComponent
      },
      {
        path: '**',
        redirectTo: 'buy-tokens'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
