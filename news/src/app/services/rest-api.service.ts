import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {
  url: string = 'https://api.spaceflightnewsapi.net/v3/articles';
  constructor(private http: HttpClient) { }

  getArticles(amount: number): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('_limit', amount);
    return this.http.get(this.url, {headers, params});
  }
}
