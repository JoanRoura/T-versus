import { Component } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-spendtokens-page',
  templateUrl: './spendtokens-page.component.html',
  styleUrls: ['./spendtokens-page.component.css']
})
export class SpendtokensPageComponent {

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

  spendTokens(price: number) {

    if(this.currentTokensUser! > price){
      const totalTokens = this.currentTokensUser! - price;
      this.storeService.buyTokens(this.user.email, totalTokens)
        .subscribe(resp => {
          console.log(resp);
        });
    }else {

    }

  }
}
