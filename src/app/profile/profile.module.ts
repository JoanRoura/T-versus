import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { HomeProfileComponent } from './pages/home-profile/home-profile.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";


@NgModule({
  declarations: [
    HomeProfileComponent,
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PrimeNgModule
  ]
})
export class ProfileModule { }
