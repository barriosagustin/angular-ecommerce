import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart.service';
import { Articles } from 'src/app/interfaces/articles';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public articles: any[] = [];
  public products: any[] = [];
  public mainImage: string = '';
  public starRating: number = 0;
  public selectedSize: string = '';
  public quantity: string = '';
  public singleProduct: Array<Articles>=[]

  idArticle: any;

  constructor(
    private _apiService: ApiService,
    private _cartService: CartService,
    private aRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    const idParam = 'id';
    this.idArticle = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    this.getArticleId();
    this.getNewId();
    
  }

  getNewId(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Aquí puedes realizar las acciones necesarias cuando cambia la URL
        const url = event.url;
        const parts = url.split("/");
        const lastPart = parts[parts.length - 1];
        const number = parseInt(lastPart, 10);

        if(this.idArticle != number)
        {
          this.idArticle = number;
          this.getArticleId();          
          return;
        }
      }
    });
  }

  onSelectedQuantity(value: string): void {
    this.quantity = value
    this.singleProduct[0].quantity = parseInt(this.quantity,10);
    this._cartService.setQuantity(this.singleProduct[0].quantity);
    console.log('esta es la propiedad modificada---->',this.quantity)
  }

  onSelectedSize(value: string): void {
    this.selectedSize = value;
    this.singleProduct[0].size = this.selectedSize
    this._cartService.setSize(this.selectedSize);
  }

  getArticleId() {
    let selectedQuantity = this.quantity // Almacenar el valor de this.quantity en una variable local
    let selectedSize = this.selectedSize

    this._apiService.getDataId(this.idArticle).subscribe((res) => {
      console.log('soyselectedQUANTITYT',selectedQuantity)
      this.singleProduct = [{
        title: res[0].title,
        category: res[0].category,
        price: res[0].price,
        image: res[0].image,
        description: res[0].description,
        rating: res[0].rating,
        cod: res[0].cod,
        id: res[0].id,
        quantity: selectedQuantity ? parseInt(selectedQuantity,10) : 0,
        size:selectedSize?selectedSize:''
      }];   
    });
  }


  addToCart() {
    if(this.quantity == '0' || this.quantity == ''){
      this.validationMessageQuantity();
      return;
    }
    if (parseInt(this.quantity) < -1) {
      this.validationMessageNegativeQuantity();
      return;
    }
    if(!this.selectedSize || this.selectedSize == 'Select Size'){
      this.validationMessageSize();
      return;
    }
    else{
    this.getArticleId();
    this._cartService.addToCart(this.singleProduct[0]);
    this.addMessage();
    }
  }

  addMessage() {
    this._snackBar.open('The product was added to cart!!', 'Added', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  validationMessageQuantity(){
    this._snackBar.open(`Quantity can't be empty`, 'No added', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  validationMessageSize(){
    this._snackBar.open(`Size can't be empty`, 'No added', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  validationMessageNegativeQuantity(){
    this._snackBar.open(`Quantity can't be a negative number`, 'No added', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  
}
