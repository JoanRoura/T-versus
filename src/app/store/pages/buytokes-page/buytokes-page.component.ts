import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-buytokes-page',
  templateUrl: './buytokes-page.component.html',
  styleUrls: ['./buytokes-page.component.css']
})
export class BuytokesPageComponent {
  get user() {
    return this.authService.getCurrentUser;
  }

  get getTokens(){
    return 
  }

constructor(  
    private authService: AuthService,
    private router: Router) { }

}
