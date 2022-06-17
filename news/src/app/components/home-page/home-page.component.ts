import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {RestAPIService} from "../../services/rest-api.service";
import {iArticle} from "../../app-interfaces";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  articleAmount: number = 30;
  cards: Observable<iArticle[]> = this.restAPIService.getArticles(this.articleAmount).pipe(
    map(( articles: any[] ) => articles.map(article => {
      console.log(article);
      return <iArticle>{
        id: article.id,
        title: article.title,
        imgUrl: article.imageUrl,
        date: article.publishedAt,
        text: article.summary,
        cols: 1,
        rows: 1
        }
    })
  ));

  constructor(private readonly restAPIService: RestAPIService, private router: Router  ) {}

  showWholeArticle(id: number) {
    this.router.navigateByUrl(`article/${id}`);
  }
}
