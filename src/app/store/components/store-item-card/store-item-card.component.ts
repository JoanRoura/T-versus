import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['./store-item-card.component.css']
})
export class StoreItemCardComponent implements OnInit {

  currentTokensUser!: number | undefined;

  get user() {
    return this.authService.getCurrentUser;
  }

  constructor(
    private authService: AuthService,
    private storeService: StoreService) { }
  
  ngOnInit(): void {

    // Obtener los tokens del usuario
    this.authService.getOneUser(this.user.email)
      .subscribe(user => {
        this.currentTokensUser = user.tokens
      });
  }

  buyTokens(tokens: number) {

    const totalTokens = this.currentTokensUser! + tokens;
  
    this.storeService.buyTokens(this.user.email, totalTokens)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
