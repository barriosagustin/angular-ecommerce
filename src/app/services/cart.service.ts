import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  private _quantity: number = 1;

  constructor() {}
  getProduct() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  getQuantity(): number {
    return this._quantity;
  }

  setQuantity(quantity: number) {
    this._quantity = quantity;
  }

  addToCart(product: any) {
    let alreadyExists = false;
    this.cartItemList.forEach((item: any, index: any) => {
      if (item.id === product.id) {
        alreadyExists = true;
        item.quantity += 1;
        this.cartItemList[index] = item;
        console.log(this.cartItemList);
      }
    });
    if (!alreadyExists) {
      product.quantity = 1;
      this.cartItemList.push(product);
      console.log(this.cartItemList);
    }
    this.productList.next(this.cartItemList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.price * a.quantity;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.findIndex(
      (item: any) => item.id === product.id
    );
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
    }
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
