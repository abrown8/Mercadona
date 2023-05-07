import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListArticleComponent } from './list-article/list-article.component';
import { RouterModule, Routes } from '@angular/router';


const ArticleRoutes: Routes = [
  { path: 'catalogue', component: ListArticleComponent }
];

@NgModule({
  declarations: [
    ListArticleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ArticleRoutes)
  ]
})
export class ArticleModule { }
