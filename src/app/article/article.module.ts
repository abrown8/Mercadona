import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListArticleComponent } from './list-article/list-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { BorderCardDirective } from './border-card.directive';
import { RouterModule, Routes } from '@angular/router';


const ArticleRoutes: Routes = [
  { path: 'catalogue', component: ListArticleComponent },
  { path: 'catalogue/:id', component: DetailArticleComponent }
];

@NgModule({
  declarations: [
    ListArticleComponent,
    DetailArticleComponent,
    BorderCardDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ArticleRoutes)
  ]
})
export class ArticleModule { }
