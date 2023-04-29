import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/tournaments/services/user.service';

@Component({
  selector: 'app-store-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['./store-item-card.component.css']
})
export class StoreItemCardComponent {
  get user() {
    return this.authService.getCurrentUser;
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  buyTokens() {
    console.log(this.user.email)
    this.userService.buyTokens(this.user.email,1000)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
