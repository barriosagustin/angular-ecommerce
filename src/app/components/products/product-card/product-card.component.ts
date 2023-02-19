import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() featured: boolean = false;
  @Input() latest: boolean = false;
  @Input() filterProduct: string = '';
  @Input() page: number = 0;
  limit: number = 8;
  items: any[] = [];
  starRating = 0;

  constructor(private _apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.findSection();
    this.filterProducts();
    if (this.page != 0) {
      this.getArticlesPagination();
    }
  }

  getArticles() {
    this._apiService.getData().subscribe((res) => {
      (this.items = res), console.log(res[0].rating);
      this.starRating = this.items[0].rating;
    });
  }

  getArticlesSortPrice() {
    this._apiService.getArticleSortBy('price', 'desc').subscribe((res) => {
      this.items = res;
      this.starRating = this.items[0].rating;
    });
  }

  getArticlesSortRating() {
    this._apiService.getArticleSortBy('rating', 'desc').subscribe((res) => {
      this.items = res;
      this.starRating = this.items[0].rating;
    });
  }

  getIndex(i: number) {
    console.log(i + 'index');
    // this._apiService.getDataId(i).subscribe((res) => console.log(res));
    this.router.navigate(['/product-detail/', i]);
  }

  findSection() {
    if (this.featured == true) {
      this.getArticles();
    }
    if (this.latest == true) {
      this.getArticlesSortPrice();
    }
  }

  filterProducts() {
    if (this.filterProduct === '1') {
      this.getArticles();
      // this.getArticlesPagination();
      console.log('default sort');
    } else if (this.filterProduct == '2') {
      this.getArticlesSortPrice();
      console.log('sortPrice');
    } else if (this.filterProduct == '3') {
      this.getArticlesSortRating();
      console.log('sortRating');
    }
  }

  getArticlesPagination() {
    this._apiService
      .getArticleParams(this.page, this.limit)
      .subscribe((res) => {
        this.items = res;
        this.starRating = this.items[0].rating;
      });
  }
}
