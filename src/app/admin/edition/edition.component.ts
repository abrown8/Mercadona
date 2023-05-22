import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Article } from '../../article/article';
import { ArticleService } from '../../article/article.service';
import { Promotion } from '../../article/promotion';
import { AuthService } from '../../auth.service';
import { Categorie } from 'src/app/article/categorie';

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
  categorieList: Categorie[];
  selectedCategorie: Categorie|undefined;
  catHasPromoValue: boolean = false;
  reducePriceCache: ReducePriceCache = {};

  constructor(
    private router: Router,
    private ngZone: NgZone,
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

    this.articleService.getCategorieList()
      .subscribe(categorieList => {
        this.categorieList = categorieList.map(categorie => Object.assign(new Categorie(categorie.libele), categorie));
      });

    this.auth = this.authService;
  }

  catHasPromo(): void {
    console.log("play catHasPromo avec la cat ",this.selectedCategorie?.libele);
    if (this.selectedCategorie) {
      for (const article of this.articleList) {
        if (this.selectedCategorie.id === article.categorie.id) {
          const promotion: Observable<Promotion | undefined> = article.promotion;
          this.catHasPromoValue = false;
          promotion.subscribe((promotion) => {
            if (promotion) {
              this.catHasPromoValue = true;
            }
            if (this.catHasPromoValue && !promotion) {
              this.catHasPromoValue = false;
            }
          });
        }
      }     
    }
  }
  
  
  

  onCategorieSelected(event: Event) {
    const selectedId: number = +(event.target as HTMLSelectElement).value;
    this.articleService.getCategorieById(selectedId)
      .subscribe((categorie) => {
        this.selectedCategorie = categorie;
        this.catHasPromo()
      },
      (error) => console.log(error)
      );      
  }

  editPromotion(article: Article) {
    this.ngZone.run(() => {
      this.router.navigate(['/admin', article.id])
    });
  }

  editPromotionCategorie() {
    this.ngZone.run(() => {
      if (this.selectedCategorie) {
        this.router.navigate(['/admin/categorie', this.selectedCategorie.id])
      }
    });
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

  deletePromotionCategorie() {
    if (this.selectedCategorie){
      const selectedCategoryId = this.selectedCategorie.id;
    
      this.articleList.forEach((article: Article) => {
        if (article.categorie.id === selectedCategoryId) {
          const promotion: Observable<Promotion | undefined> = article.promotion;
          promotion.subscribe((promotion) => {
            if (promotion?.id) {
              this.articleService.deletePromotionById(promotion.id).subscribe(() => {
                article.promotion = of(undefined);
              });
            }
          });
        }
      });
    }
  }
  
  
  nouvelArticle(): void {
    this.ngZone.run(() => {
      this.router.navigate(['/admin/nouvel-article']);
    });
  }

  logout() {
    this.auth.logout();
    this.ngZone.run(() => {
      this.router.navigate(['/catalogue'])
    });
  }
}
