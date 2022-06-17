import { Component, OnInit } from '@angular/core';
import {RestAPIService} from "../../services/rest-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit {
  article = {
    title: '',
    summary: '',
    imageUrl: ''
  }
  constructor(private readonly restAPI: RestAPIService, private router: Router, private rote: ActivatedRoute) { }
  private id: number = this.rote.snapshot.params['id'];

  ngOnInit(): void {
    this.restAPI.getArticle(this.id).subscribe((articleData: any) => {
      this.article = articleData;
      console.log(this.article)
    });
  }

}
