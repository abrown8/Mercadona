import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article.service';
import { Promotion } from 'src/app/article/promotion';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
})
export class EditionComponent {
  articleList: Article[];
  promotionList: Promotion[];
  auth: AuthService;

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.articleList = this.articleService.getArticleList();
    this.promotionList = this.articleService.getPromotionList();
    this.auth = this.authService;
  }

  goToArticle(article: Article) {
    this.router.navigate(['/catalogue', article.id])
  }

  editPromotion(article: Article) {
    this.router.navigate(['/admin', article.id])
  }

  deletePromotion(article: Article) {
    const promotion_id: number|undefined = article.getPromotion()?.id;
    if (promotion_id) {
      this.articleService.deletePromotion(promotion_id);
    }
  }

  getReducePrice(article: Article): number {
    const promo: Promotion|undefined = article.getPromotion();
    if(promo) {
      return article.prix - (article.prix * (promo.pourcentage_remise / 100));
    }
    return 0;
  }

  nouvelArticle(){
    this.router.navigate(['/admin/nouvel-article'])
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/catalogue'])
  }
}
