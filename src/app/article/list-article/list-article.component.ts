import { Component } from '@angular/core';
import { Article } from '../article';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Promotion } from '../promotion';
import { Categorie } from '../categorie';
import { Observable, map, of } from 'rxjs';

interface ReducePriceCache {
  [articleId: number]: number;
}

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',

})
export class ListArticleComponent {
  articleList: Article[];
  filteredArticleList: Article[];
  categorieList: Categorie[];
  selectedCategorie: Categorie|undefined;
  reducePriceCache: ReducePriceCache = {};


  constructor(
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    console.log("NG ON INIT")
    this.articleService.getArticleList()
      .subscribe(articleList => {
        this.articleList = articleList.map(article => Object.assign(new Article(article.libele, article.description, article.image, article.prix, article.categorie, this.articleService), article));
        console.log("1.",this.articleList)
        this.initFilteredArticleList()
      });
      this.articleService.getCategorieList()
      .subscribe(categorieList => {
        this.categorieList = categorieList.map(categorie => Object.assign(new Categorie(categorie.libele), categorie));
        console.log("2.",this.categorieList)
      });
  }

  // getReducePrice(article: Article): number {
  //   const promo: Observable<Promotion|undefined> = article.getPromotion();
  //   promo.subscribe(promo => {
  //       if (promo) {
  //         return article.prix - (article.prix * (promo.pourcentage_remise / 100));
  //       } 
  //       return 0;
  //     });
  //   return 0;
  // }

  
  getReducePrice(article: Article): Observable<number> {
    console.log("GET REDUCE PRICE")
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
    console.log("GET REDUCE PRICE FOR ATICLE")
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
  
  
  
  onCategorieSelected(event: Event) {
    console.log("ON CATEGORIE SELECT")
    const selectedId: number = +(event.target as HTMLSelectElement).value;
    this.articleService.getCategorieById(selectedId)
      .subscribe((categorie) => {
        this.selectedCategorie = categorie;
        console.log("The selected categorie is : ",this.selectedCategorie)
        this.filterArticleList(this.selectedCategorie);
      },
      (error) => console.log(error)
      );      
  }
  
  

  filterArticleList(categorie: Categorie|undefined) {
    console.log("FILTER ARTICLE LIST ",categorie)
    if (categorie) {
      this.filteredArticleList = this.articleList.filter(article => article.categorie.id === categorie.id);
    }
    else {
      this.filteredArticleList = this.articleList;
    }
  }

  initFilteredArticleList() {
    this.filteredArticleList = this.articleList;
  }
  
  
  
}
