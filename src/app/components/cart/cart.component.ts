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

  quantity: number = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getPrice();
  }

  getProducts() {
    this._cartService.getProduct().subscribe((res) => {
      this.products = res;
    });
    this.getQuantity();
  }

  getPrice() {
    this.totalPrice = this._cartService.getTotalPrice();
  }

  getQuantity() {
    this.quantity = this._cartService.getQuantity();
    console.log(this.quantity);
  }

  removeItem(product: any) {
    this._cartService.removeCartItem(product);
    this.getPrice();
    this.quantity = 1;
  }

  removeAllCart() {
    this._cartService.removeAllCart();
    this.totalPrice = 0;
    this.quantity = 1;
  }
}
