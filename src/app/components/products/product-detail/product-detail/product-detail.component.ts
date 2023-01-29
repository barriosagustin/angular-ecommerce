import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  @Output()
  public hideHeader: boolean = true;
  public articles: any[] = [];
  public products: any[] = [];

  idArticle: any;

  constructor(
    private _apiService: ApiService,
    private aRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    const idParam = 'id';
    this.idArticle = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    this.getArticleId();
    this.getArticles();
    // console.log(this.idArticle);
  }

  getArticleId() {
    // console.log('hola');
    // this._apiService.getDataId(1).subscribe((res) => console.log(res));
    this._apiService
      .getDataId(this.idArticle)
      .subscribe((res) => (this.articles = res));
  }

  getArticles() {
    this._apiService
      .getArticleParams(1, 4)
      .subscribe((res) => (this.products = res));
  }

  addToCart() {
    console.log('prueba');
    this.addMessage();
  }

  addMessage() {
    this._snackBar.open('The product was added to cart!!', 'Added', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
