import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  filts: any[] = [
    { value: '1', viewValue: 'Default Sort' },
    { value: '2', viewValue: 'Sort By Price' },
    { value: '3', viewValue: 'Sort By Rating' },
  ];

  filter: string = '1';
  filterElection: string = '';
  pageProducts: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.getValue();
  }

  getValue() {
    // this.filterElection = this.filter;
    console.log(this.filter);
  }

  getPage(page: number) {
    this.pageProducts = page;
    console.log(this.pageProducts);
  }
}
