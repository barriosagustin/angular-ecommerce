import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articles } from '../interfaces/articles';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private articlesUrl = 'https://63d1b8bb1780fd6ab9b854d6.mockapi.io/articles';

  constructor(private http: HttpClient) {}

  public getData(): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.articlesUrl);
  }

  public getDataId(id: number): Observable<Articles[]> {
    return this.http.get<Articles[]>(this.articlesUrl + '?id=' + id);
  }

  public getArticleParams(page: number, limit: number): Observable<Articles[]> {
    return this.http.get<Articles[]>(
      this.articlesUrl + '?page=' + page + '&limit=' + limit
    );
  }

  public getArticleSortBy(
    param: string,
    order: string
  ): Observable<Articles[]> {
    return this.http.get<Articles[]>(
      this.articlesUrl + '?sortBy=' + param + '&order=' + order
    );
  }
}
