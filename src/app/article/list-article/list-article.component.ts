import { Component } from '@angular/core';
import { Article } from '../article';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Promotion } from '../promotion';

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
  }

  goToArticle(article: Article) {
    this.router.navigate(['/catalogue', article.id])
  }

  getReducePrice(article: Article): number {
    const promo: Promotion|undefined = article.getPromotion();
    if(promo) {
      return article.prix - (article.prix * (promo.pourcentage_remise / 100));
    }
    return 0;
  }
  
}
