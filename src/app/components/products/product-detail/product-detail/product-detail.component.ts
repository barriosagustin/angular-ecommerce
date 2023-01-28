import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  @Output()
  public hideHeader: boolean = true;
  public articles: any[] = [];

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this.getArticleId();
  }

  getArticleId() {
    // console.log('hola');
    // this._apiService.getDataId(1).subscribe((res) => console.log(res));
    this._apiService.getDataId(1).subscribe((res) => (this.articles = res));
  }
}
