import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input()
  public hide: boolean = false;
  public totalItem: number = 0;

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this._apiService.getData().subscribe((res) => {
      this.totalItem = res.length;
    });
    console.log(this.totalItem + 'total');
  }
}
