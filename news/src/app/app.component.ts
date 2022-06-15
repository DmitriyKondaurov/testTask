import { Component, OnInit } from '@angular/core';
import {RestAPIService} from "./services/rest-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'news';

  constructor( ) { }

  ngOnInit(): void {

  }
}


