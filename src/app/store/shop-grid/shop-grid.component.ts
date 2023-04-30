import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.css']
})
export class ShopGridComponent {
  shopItems: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.shopItems = this.authService.getShopItems();
  }

  onProductClick(item: any) {
    this.router.navigate(['/compra', item]);
  }
}











