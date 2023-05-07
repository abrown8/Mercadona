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
    this.articleService.getArticleList()
      .subscribe(articleList => {
        this.articleList = articleList.map(article => Object.assign(new Article(article.libele, article.description, article.image, article.prix, article.categorie, this.articleService), article));
        this.initFilteredArticleList()
      });
      this.articleService.getCategorieList()
      .subscribe(categorieList => {
        this.categorieList = categorieList.map(categorie => Object.assign(new Categorie(categorie.libele), categorie));
      });
  }

  getReducePrice(article: Article): Observable<number> {
    return article.promotion.pipe(
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
      return of(this.reducePriceCache[article.id]);
    } else {
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
    const selectedId: number = +(event.target as HTMLSelectElement).value;
    this.articleService.getCategorieById(selectedId)
      .subscribe((categorie) => {
        this.selectedCategorie = categorie;
        this.filterArticleList(this.selectedCategorie);
      },
      (error) => console.log(error)
      );      
  }
  
  filterArticleList(categorie: Categorie|undefined) {
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
