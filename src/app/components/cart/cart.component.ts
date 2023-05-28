import { Component, OnInit } from '@angular/core';
import { of,Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  cartItems: any[] = [];
  public totalPrice!: number;
  quantity: any;
  quantity1: any;
  size$: Observable<any> = of('')

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    // this.getProducts();
    this.getLocalStorage();
    this.getPrice();
  }

  getLocalStorage(){
    this._cartService.productList.subscribe(item =>{
      this.cartItems = item;
    })
  }

  getProducts() {
    this._cartService.getProduct().subscribe((res) => {
      this.products = res;
    });
    this.getSize();
  }

  getPrice() {
    this.totalPrice = this._cartService.getTotalPrice();
  }

  getSize(){
  this._cartService.getSize().subscribe((res:any) =>{
    this.size$ = res
  });
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
    this._cartService.clearCartLocalStorage();
  }
}
