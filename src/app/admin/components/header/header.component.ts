import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get user() {
    return this.authService.getCurrentUser;
  }

  constructor(
    private authService: AuthService,
    private router: Router) { }

  logOut() {
    this.authService.logout()
      .then(resp => {
        console.log(resp);
        this.router.navigate(['/auth/login']);
      })
      .catch(error => console.log(error));
  }

}
