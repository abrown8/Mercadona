import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Article } from '../../../article/article';
import { ArticleService } from '../../../article/article.service';
import { Promotion } from '../../../article/promotion';

interface ReducePriceCache {
  [articleId: number]: number;
}

@Component({
  selector: 'app-edition-promo',
  templateUrl: './edition-promo.component.html',
})
export class EditionPromoComponent {
  articleList: Article[];
  article: Article|undefined;
  promotionList: Promotion[];
  promotionEnCours: Observable<Promotion|undefined>;
  promotionEnCours_remise: number
  promotionEnCours_date_debut: Date
  promotionEnCours_date_fin: Date
  pourcentages: number[] = [10, 20, 30, 40, 50];
  reducePriceCache: ReducePriceCache = {};


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private ngZone: NgZone,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticleList()
      .subscribe(articleList => {
        this.articleList = articleList.map(article => Object.assign(new Article(article.libele, article.description, article.image, article.prix, article.categorie, this.articleService), article));
      });
    this.articleService.getPromotionList()
      .subscribe(promotionList => {
        this.promotionList = promotionList.map(promotion => Object.assign(new Promotion(promotion.date_debut, promotion.date_fin, promotion.pourcentage_remise, promotion.article), promotion));
      });
      
    const articleId: string|null = this.route.snapshot.paramMap.get('id');    
    if(articleId){
      this.articleService.getArticleById(+articleId)
        .subscribe(article => {
          if (article) {
            this.article = Object.assign(new Article(article.libele, article.description, article.image, article.prix, article.categorie, this.articleService), article);
            this.article.promotion.subscribe(promotion => {
              if (promotion) {
                this.promotionEnCours_remise = promotion.pourcentage_remise;
                this.promotionEnCours_date_debut = promotion.date_debut;
                this.promotionEnCours_date_fin = promotion.date_fin;
              } 
            });
          }
        });
    }  
  }
    
  back() {
    this.ngZone.run(() => {
      this.router.navigate(['/admin'])
    });
  }

  deletePromotion(article: Article) {
    const promotion: Observable<Promotion|undefined> = article.promotion;
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
  
  onSubmit(): void {
    if (this.article?.id){
      const newPromotion = new Promotion(
        this.promotionEnCours_date_debut,
        this.promotionEnCours_date_fin,
        this.promotionEnCours_remise,
        this.article
      );
    
      this.deletePromotion(this.article)
      this.articleService.updatePromotion(newPromotion)
      .subscribe((newPromotion) => {
      });

    }
    this.back()
  }

  
}
