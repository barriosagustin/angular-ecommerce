import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  @Output()
  public hideHeader: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
