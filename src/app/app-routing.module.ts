import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArticleComponent } from './list-article/list-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'articles', component: ListArticleComponent },
  { path: 'article/:id', component: DetailArticleComponent },
  { path: '', redirectTo: 'articles', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
