import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  private newId$ = new BehaviorSubject<any>('');
  private quantityValue$ = new BehaviorSubject<any>(0);
  private size$ = new BehaviorSubject<any>('');


  constructor() {  
    const storedCart = localStorage.getItem('cart');
    if(storedCart){
      this.cartItemList = JSON.parse(storedCart);
      this.cartItemList.quantity = this.quantityValue$;
      this.cartItemList.size = this.size$;
      this.productList.next(this.cartItemList)
    }
  }

  getProduct() {
    console.log(this.productList)
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  getQuantity(): Observable<any> {
    return this.quantityValue$.asObservable();
  }

  setQuantity(quantity: any) {
    this.quantityValue$.next(quantity);
  }

  getSize(): Observable<any>{
    return this.size$.asObservable()
  }

  setSize(size:string){
    this.size$.next(size);
  }

  getNewId(): any{
    return this.newId$.asObservable();
  }

  setNewId(id:string): void{
    this.newId$.next(id);
  }

  // addToCart(product: any) {
  //   let alreadyExists = false;
  //   this.cartItemList.forEach((item: any, index: any) => {
  //     if (item.id === product.id) {
  //       alreadyExists = true;
  //       item.quantity += 1;
  //       this.cartItemList[index] = item;
  //       console.log(this.cartItemList);
  //     }
  //   });
  //   if (!alreadyExists) {
  //     product.quantity = 1;
  //     this.cartItemList.push(product);
  //     console.log(this.cartItemList);
  //   }
  //   this.productList.next(this.cartItemList);
  // }
  addToCart(product: any) {
    // let alreadyExists = false;
  
    // this.cartItemList.forEach((item: any, index: any) => {
    //   if (item.id === product.id) {
    //     alreadyExists = true;
    //     item.quantity += 1;
    //     this.cartItemList[index] = item;
    //   }
    // });
  
    // if (!alreadyExists) {
      // product.quantity = product.quantity;
      this.cartItemList.push(product);
    // }
  
    this.productList.next(this.cartItemList);
  
    // Guardar el carrito en el localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
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

        // Guardar el carrito actualizado en el Local Storage
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));

  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  clearCartLocalStorage() {
    localStorage.removeItem('cart');
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
