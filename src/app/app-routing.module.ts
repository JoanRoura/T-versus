import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { SharedModule } from './shared/shared.module';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  { 
    path: 'tournaments',
    loadChildren: () => import('./tournaments/tournaments.module').then( m => m.TournamentsModule),
    ...canActivate(() => redirectUnauthorizedTo(['/auth/login']))
  },
  { 
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StoreModule),
    ...canActivate(() => redirectUnauthorizedTo(['/auth/login']))
  },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule),
    ...canActivate(() => redirectUnauthorizedTo(['/auth/login']))
  },
  { 
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule),
    ...canActivate(() => redirectUnauthorizedTo(['/auth/login']))
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
   path: '**',
   redirectTo: 'auth' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
