import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cart.service';

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

  idArticle: any;

  constructor(
    private _apiService: ApiService,
    private _cartService: CartService,
    private aRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    const idParam = 'id';
    this.idArticle = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    this.getArticleId();
    this.getArticles();
  }

  getArticleId() {
    this._apiService.getDataId(this.idArticle).subscribe((res) => {
      this.articles[0] = res[0];
      this.mainImage = this.articles[0].image;
    });
  }

  getArticles() {
    this._apiService.getArticleParams(1, 4).subscribe((res) => {
      this.products = res;
      this.starRating = res[0].rating;
    });
  }

  addToCart() {
    this._cartService.addToCart(this.articles[0]);
    this.addMessage();
  }

  changeImage(url: string) {
    this.mainImage = url;
  }

  addMessage() {
    this._snackBar.open('The product was added to cart!!', 'Added', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
