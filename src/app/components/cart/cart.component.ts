import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  public totalPrice!: number;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.getProduct().subscribe((res) => {
      this.products = res;
    });

    this.getPrice();
  }

  getPrice() {
    this.totalPrice = this._cartService.getTotalPrice();
  }

  removeItem(product: any) {
    this._cartService.removeCartItem(product);
    this.getPrice();
  }

  removeAllCart() {
    this._cartService.removeAllCart();
    this.totalPrice = 0;
  }
}
