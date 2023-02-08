import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.getProduct().subscribe((res) => {
      this.products = res[0];
    });
  }
}
