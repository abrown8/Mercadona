import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { Article } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article.service';
import { Promotion } from 'src/app/article/promotion';
import { AuthService } from 'src/app/auth.service';

interface ReducePriceCache {
  [articleId: number]: number;
}

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
})
export class EditionComponent {
  articleList: Article[];
  promotionList: Promotion[];
  auth: AuthService;
  reducePriceCache: ReducePriceCache = {};

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.articleService.getArticleList()
      .subscribe(articleList => {
        this.articleList = articleList.map(article => Object.assign(new Article(article.libele, article.description, article.image, article.prix, article.categorie, this.articleService), article));
      });

    this.articleService.getPromotionList()
      .subscribe(promotionList => {
        this.promotionList = promotionList.map(promotion => Object.assign(new Promotion(promotion.date_debut, promotion.date_fin, promotion.pourcentage_remise, promotion.article), promotion));
      });

    this.auth = this.authService;
  }


  goToArticle(article: Article) {
    this.router.navigate(['/catalogue', article.id])
  }

  editPromotion(article: Article) {
    this.router.navigate(['/admin', article.id])
  }

  deletePromotion(article: Article) {
    const promotion: Observable<Promotion|undefined> = article.promotion;
    promotion.subscribe(promotion => {
      if (promotion?.id) {
        this.articleService.deletePromotionById(promotion.id).subscribe(() => {
          article.promotion = of(undefined);
        });
      }
    });
  }
  

  dateFormater(formDate: string): string {
    const dateParts = formDate.split("-");
    return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]
  }

  nouvelArticle(){
    this.router.navigate(['/admin/nouvel-article'])
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/catalogue'])
  }
}
