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
  filterText: string = '';
  parsedSentence: string[] = [];
  articleAmount: number = 30;
  articlesList: iArticle[] = [];

  cards: Observable<iArticle[]> = this.restAPIService.getArticles(this.articleAmount).pipe(
    map(( articles: any[] ) => articles.map(article => {
      return <iArticle>{
        id: article.id,
        title: article.title,
        imgUrl: article.imageUrl,
        date: article.publishedAt,
        text: article.summary,
        orderByTitleMatch: 0,
        orderByTextMatch: 0
        }
    })
  ));

  constructor(private readonly restAPIService: RestAPIService, private router: Router  ) {}

  ngOnInit() {
    let a = 'row bar'
    let b = 'bardd dgdd row bar foo fgdf'
    console.log(a.localeCompare(b))
    console.log(b.includes(a))
    this.cards.subscribe((data) => {
      this.articlesList = data;
    })
  }

  showWholeArticle(id: number) {
    this.router.navigateByUrl(`article/${id}`);
  }

  rebuildArticlesList () {
    this.parsedSentence = this.removeDuplicates(this.parseSentence(this.filterText));
    this.articlesList = this.articlesList.map((article) => {
      return <iArticle> {
        id: article.id,
        title: this.findMatch(article.title),
        imgUrl: article.imgUrl,
        date: article.date,
        text: article.text,
        orderByTitleMatch: 0,
        orderByTextMatch: 0
      }
    })
    console.log(this.articlesList)
  }

  filterArticles() {
    this.articlesList = this.articlesList.filter((item) => !!((item.orderByTextMatch || item.orderByTitleMatch)))
    console.log(this.articlesList)
  }

  parseSentence(sentence: string): string[] {
    return sentence.trim().replace(/\s{2,}/g, " ").split(' ');
    // console.log(this.parsedSentence);
  }

  removeDuplicates(array: string[]) {
    return array.filter((value, index) => array.indexOf(value) === index)
  }

  findMatch(text: string): string {
    const parsedText: string[] = this.parseSentence(text)

    const result = parsedText.map((word) => {
      if (this.parsedSentence.includes(word)) {
        return `<mark>${word}</mark>`
      } else return word;
    })

    return result.join(' ')
  }
}
