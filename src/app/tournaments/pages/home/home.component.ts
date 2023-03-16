import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
