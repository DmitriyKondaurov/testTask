import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {RestAPIService} from "../../services/rest-api.service";
import {iArticle} from "../../app-interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  articleAmount: number = 30;
  cards: Observable<iArticle[]> = this.restAPIService.getArticles(this.articleAmount).pipe(
    map(( articles: any[] ) => articles.map(article => {
      return <iArticle>{
        title: article.title,
        imgUrl: article.imageUrl,
        date: article.publishedAt,
        text: article.summary,
        cols: 1,
        rows: 1
        }
    })
  ));

  constructor(private readonly restAPIService: RestAPIService ) {}
}
