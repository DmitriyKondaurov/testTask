import { Component, OnInit } from '@angular/core';
import {RestAPIService} from "./services/rest-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'news';
  filterText: string = '';
  articlesList: any[] = [];
  constructor(private readonly restAPIService: RestAPIService ) { }

  ngOnInit(): void {
    this.restAPIService.getArticles().subscribe((data: any) => {
      this.articlesList = data;
      console.log(data);
    })
  }
}


