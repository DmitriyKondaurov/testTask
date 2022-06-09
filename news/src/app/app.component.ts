import { Component, OnInit } from '@angular/core';
import {RestAPIService} from "./services/rest-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'news';

  constructor(private readonly restAPIService: RestAPIService ) { }

  ngOnInit(): void {
    this.restAPIService.getArticles().subscribe((data: any) => {
      console.log(data);
    })
  }
}


