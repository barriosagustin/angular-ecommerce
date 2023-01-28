import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/interfaces/articles';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  public articles: Articles = {
    title: '',
    category: '',
    price: 0,
    image: [''],
    description: '',
    rating: 0,
    cod: 0,
    id: '',
  };

  items: any[] = [];

  starRating = 3;

  constructor(private _apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this._apiService.getData().subscribe((res) => (this.items = res));
    // console.log(this.articles.title);
  }

  getIndex(i: number) {
    console.log(i);
    this._apiService.getDataId(i).subscribe((res) => console.log(res));
    this.router.navigate(['/product-detail']);
  }
}
