import { Component } from '@angular/core';
import { Article } from '../article';
import { ARTICLES } from '../article-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',

})
export class ListArticleComponent {
  articleList: Article[] = ARTICLES

  constructor(private router: Router) {}

  goToArticle(article: Article) {
    this.router.navigate(['/article', article.id])
  }
}
