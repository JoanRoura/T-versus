import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/tournaments/services/user.service';
import { User } from '../../../tournaments/interfaces/user.interface';

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

  buyTokens(tokens:number) {
    //cojer los tokens del usuario y guardarlo en oldTokens
    const oldTokens = 1000
    var newTokens = oldTokens + tokens 
    this.userService.buyTokens(this.user.email,newTokens)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
