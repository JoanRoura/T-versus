import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {

  visibleSidebar!: boolean;

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
