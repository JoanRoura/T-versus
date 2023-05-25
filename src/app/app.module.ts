import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AngularFireModule } from '@angular/fire/compat'
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component'; // TODO: Treure aquest import
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AdminTournamentRondesComponent } from './admin-tournament-rondes/admin-tournament-rondes.component';
import { AdminDatosRondaComponent } from './admin-datos-ronda/admin-datos-ronda.component';
import { AdminDetallMatchComponent } from './admin-detall-match/admin-detall-match.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    AdminTournamentRondesComponent,
    AdminDatosRondaComponent,
    AdminDetallMatchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    // AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {

  }
}
