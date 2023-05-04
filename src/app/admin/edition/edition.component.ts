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
    console.log("NG ON INIT EDITION")
    this.articleService.getArticleList()
      .subscribe(articleList => {
        this.articleList = articleList.map(article => Object.assign(new Article(article.libele, article.description, article.image, article.prix, article.categorie, this.articleService), article));
        console.log("1.",this.articleList)
      });

    this.articleService.getPromotionList()
      .subscribe(promotionList => {
        this.promotionList = promotionList.map(promotion => Object.assign(new Promotion(promotion.date_debut, promotion.date_fin, promotion.pourcentage_remise, promotion.article), promotion));
        console.log(this.promotionList)
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
    const promotion: Observable<Promotion|undefined> = article.getPromotion();
    promotion.subscribe(promotion => {
      if (promotion && promotion.id) {
        this.articleService.deletePromotionById(promotion.id).pipe(
          switchMap(() => this.articleService.getArticleList())
        ).subscribe(articleList => {
          this.articleList = articleList.map(article => Object.assign(new Article(article.libele, article.description, article.image, article.prix, article.categorie, this.articleService), article));
        });
      } 
    });
  }

  dateFormater(formDate: string): string {
    const dateParts = formDate.split("-");
    return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]
  }

  // deletePromotion(article: Article) {
  //   const promotion: Promotion|undefined = article.getPromotion();
  //   if (promotion && promotion.id) {
  //     this.articleService.deletePromotionById(promotion.id).subscribe()
  //   };
  // }

  getReducePrice(article: Article): Observable<number> {
    return article.getPromotion().pipe(
      map((promo: Promotion|undefined) => {
        if (promo) {
          return article.prix - (article.prix * (promo.pourcentage_remise / 100));
        } 
        return 0;
      })
    );
  }

  getReducedPriceForArticle(article: Article): Observable<number> {
    if (article.id && this.reducePriceCache[article.id]) {
      // Si le prix réduit a déjà été calculé pour cet article, on retourne le résultat stocké dans le cache
      return of(this.reducePriceCache[article.id]);
    } else {
      // Sinon, on calcule le prix réduit et on le stocke dans le cache
      const reducedPrice$ = this.getReducePrice(article);
      reducedPrice$.subscribe(reducedPrice => {
        if (article.id) {
          this.reducePriceCache[article.id] = reducedPrice;
        }
      });
      return reducedPrice$;
    }
  }

  // getReducePrice(article: Article): number {
  //   const promo: Promotion|undefined = article.getPromotion();
  //   if (promo) {
  //     return article.prix - (article.prix * (promo.pourcentage_remise / 100));
  //   }
  //   return 0;
  // }

  nouvelArticle(){
    this.router.navigate(['/admin/nouvel-article'])
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/catalogue'])
  }
}
