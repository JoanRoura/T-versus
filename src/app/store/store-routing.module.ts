import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../tournaments/pages/home/home.component';
import { MainComponent } from '../tournaments/pages/main/main.component';
import { StoreItemCardComponent } from './components/store-item-card/store-item-card.component';
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
