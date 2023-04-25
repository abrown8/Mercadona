import { Component } from '@angular/core';
import { Article } from '../article';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',

})
export class ListArticleComponent {
  articleList: Article[];

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.articleList = this.articleService.getArticleList();
    console.log(this.articleList)
  }

  goToArticle(article: Article) {
    this.router.navigate(['/catalogue', article.id])
  }
}
