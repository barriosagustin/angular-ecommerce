import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input()
  public hide: boolean = false;
  public totalItem: number = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.getProduct().subscribe((res) => {
      this.totalItem = res.length;
    });
  }
}
