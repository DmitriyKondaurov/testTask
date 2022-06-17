import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent  }
]

const routesChild: Routes = [
  { path: 'article', loadChildren: () => import('./components/article/article-routing/article-routing.module')
      .then(m => m.ArticleRoutingModule)  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routesChild)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
