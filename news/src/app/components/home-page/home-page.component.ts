import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
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
    this.cards.subscribe((data) => {
      this.articlesList = data;
    })
  }

  showWholeArticle(id: number) {
    this.router.navigateByUrl(`article/${id}`);
  }

  filterArticlesList () {
    this.parsedSentence = this.removeDuplicates(this.parseSentence(this.filterText));
    this.articlesList = this.articlesList
      .map(article => this.checkArticle(article))
      .filter(article => article.orderByTextMatch > 0 || article.orderByTitleMatch > 0)
      .sort((a, b) => {
        if ((b.orderByTitleMatch + b.orderByTextMatch) === (a.orderByTextMatch + a.orderByTitleMatch)) {
          return b.orderByTitleMatch - a.orderByTitleMatch
        } else return (b.orderByTitleMatch + b.orderByTextMatch) - (a.orderByTitleMatch + a.orderByTextMatch)
      })
  }

  parseSentence(sentence: string): string[] {
    return sentence.trim().replace(/\s{2,}/g, " ").split(' ');
  }

  removeDuplicates(array: string[]) {
    return array.filter((value, index) => array.indexOf(value) === index)
  }

  findWordMatch(text: string): {text: string, matchersNumber: number} {
    const parsedText: string[] = this.parseSentence(text)
    let result = {
      text: '',
      matchersNumber: 0
    }

    result.text = parsedText.map((word) => {
      if (this.parsedSentence.includes(word)) {
        result.matchersNumber++;
        return `<mark>${word}</mark>`
      } else return word;
    }).join(' ')

    return result;
  }

  checkArticle(article: iArticle): iArticle {
    return {
      id: article.id,
      title: this.findWordMatch(article.title).text,
      imgUrl: article.imgUrl,
      date: article.date,
      text: this.findWordMatch(article.text).text,
      orderByTitleMatch: this.findWordMatch(article.title).matchersNumber,
      orderByTextMatch: this.findWordMatch(article.text).matchersNumber
    };
  }
}
