import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Article } from '../../../article/article';
import { ArticleService } from '../../../article/article.service';
import { Promotion } from '../../../article/promotion';
import { Categorie } from 'src/app/article/categorie';

interface ReducePriceCache {
  [articleId: number]: number;
}

@Component({
  selector: 'app-edition-promo',
  templateUrl: './edition-promo-categorie.component.html',
})
export class EditionPromoCategorieComponent {
  articleList: Article[];
  categorie: Categorie|undefined;
  categorieId: string | null;
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
    console.log("ngOnInit strt")
    this.articleService.getArticleList()
      .subscribe(articleList => {
        this.articleList = articleList.map(article => Object.assign(new Article(article.libele, article.description, article.image, article.prix, article.categorie, this.articleService), article));
      });
    this.articleService.getPromotionList()
      .subscribe(promotionList => {
        this.promotionList = promotionList.map(promotion => Object.assign(new Promotion(promotion.date_debut, promotion.date_fin, promotion.pourcentage_remise, promotion.article), promotion));
      });
    

    this.categorieId = this.route.snapshot.paramMap.get('id'); 
    if (this.categorieId) {
        this.articleService.getCategorieById(+this.categorieId)
        .subscribe((categorie) => {
          this.categorie = categorie;
        },
        (error) => console.log(error)
        );     
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
    for (const article of this.articleList) {
        if (article.categorie.id == this.categorieId) {
            if (article.id){
                const newPromotion = new Promotion(
                  this.promotionEnCours_date_debut,
                  this.promotionEnCours_date_fin,
                  this.promotionEnCours_remise,
                  article
                );
                this.deletePromotion(article)
                this.articleService.updatePromotion(newPromotion)
                .subscribe((newPromotion) => {
                });
              }
        }
    }
    this.back()
  }

  
}
