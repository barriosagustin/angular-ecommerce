import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';

declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private dialog: MatDialog, private _cartService: CartService) {}

  public totalPrice!: number;
  ngOnInit(): void {
    this.getPrice();
  }

  // openDialog() {
  //   this.dialog.open(MatDialog,this.dialog);
  // }

  getPrice() {
    this.totalPrice = this._cartService.getTotalPrice();
  }
}
