import { Component, OnInit, Input,OnChanges, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() featured: boolean = false;
  @Input() latest: boolean = false;
  @Input() productDetail: boolean = false;
  @Input() filterProduct: string = '';
  @Input() productsPage: boolean = true;
  sortBy: string = '';
  order: string = '';
  pageSelected: number = 0;
  limit: number = 8;
  items: any[] = [];
  starRating = 0;
  newId = '';

  constructor(
    private _apiService: ApiService,
    private _cartService: CartService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.findSection();
    this.filterProducts();
  }


  getArticles() {
    this.pageSelected = 1;
    this._apiService
      .getArticleParams(this.pageSelected, this.limit)
      .subscribe((res) => {
        this.items = res;
        this.starRating = this.items[0].rating;
      });
  }

  getArticlesSortPrice() {
    this.pageSelected = 1;
    this._apiService
      .getArticleAllParams('price', 'desc', this.pageSelected, this.limit)
      .subscribe((res) => {
        this.items = res;
        this.starRating = this.items[0].rating;
      });
  }

  getArticlesSortRating() {
    this.pageSelected = 1;
    this._apiService
      .getArticleAllParams('rating', 'desc', this.pageSelected, this.limit)
      .subscribe((res) => {
        this.items = res;
        this.starRating = this.items[0].rating;
      });
  }

  // getIndex(i: number) {
  //   // this.router.navigate(['/product-detail/', i]);
  //   const url = this.router.createUrlTree(['/product-detail', i]);
  //   this.location.go(url.toString());
  //   location.reload();
  // }

  getIndex(i: number) {
    const url = `/product-detail/${i}`;
    this.router.navigateByUrl(url);
    this.router.navigate(['/product-detail', i], { replaceUrl: true });
    this._cartService.setNewId(i.toString());
    this.newId = this._cartService.getNewId()

  }  

  findSection() {
    if (this.featured == true) {
      this.pageSelected = 1;
      this.limit = 8;
      this.getArticlesPagination();
    }
    if (this.latest == true) {
      this.sortBy = 'rating';
      this.order = 'desc';
      this.pageSelected = 1;
      this.limit = 8;
      this.getArticlesAllParams();
    }
    if (this.productDetail) {
      this.pageSelected = 1;
      this.limit = 4;
      this.getArticlesPagination();
    }
  }

  filterProducts() {
    if (this.filterProduct === '1') {
      this.getArticles();
      // this.getArticlesPagination();
    } else if (this.filterProduct == '2') {
      this.getArticlesSortPrice();
    } else if (this.filterProduct == '3') {
      this.getArticlesSortRating();
    }
  }

  getArticlesPagination() {
    this._apiService
      .getArticleParams(this.pageSelected, this.limit)
      .subscribe((res) => {
        this.items = res;
        this.starRating = this.items[0].rating;
      });
  }

  getArticlesAllParams() {
    this._apiService
      .getArticleAllParams(
        this.sortBy,
        this.order,
        this.pageSelected,
        this.limit
      )
      .subscribe((res) => {
        this.items = res;
        this.starRating = this.items[0].rating;
      });
  }

  getPage(page: number) {
    this.pageSelected = page;
    this.getArticlesPagination();
  }
}
