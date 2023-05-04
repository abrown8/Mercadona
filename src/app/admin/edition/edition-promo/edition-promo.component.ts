import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { Article } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article.service';
import { Promotion } from 'src/app/article/promotion';

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
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticleList()
      .subscribe(articleList => {
        this.articleList = articleList.map(article => Object.assign(new Article(article.libele, article.description, article.image, article.prix, article.categorie, this.articleService), article));
        console.log("1.",this.articleList)
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
            this.article.getPromotion().subscribe(promotion => {
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

  stringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  
  formatDateToString(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  dateFormater(formDate: string|undefined): string {
    if (formDate){
      const dateParts = formDate.split("-");
      return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]
    }
    return ""
  }

  
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
  
  back() {
    this.router.navigate(['/admin'])
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
  
  onSubmit(): void {
    console.log("ON SUBMITT NEW PROMO")
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
        console.log('Promotion ajouté :', newPromotion);
      });

    }
    this.back()
  }

  
}
