import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articles } from '../interfaces/articles';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private articles: Articles = {
    title: '',
    category: '',
    price: 0,
    image: [],
    description: '',
    id: '',
  };
  private articlesUrl = 'https://63d1b8bb1780fd6ab9b854d6.mockapi.io/articles';

  constructor(private http: HttpClient) {}

  public getData(): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.articlesUrl);
  }
}
