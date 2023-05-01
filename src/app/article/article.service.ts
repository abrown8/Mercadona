import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './article';
import { ARTICLES } from './article-list';
import { Category } from './category';
import { CATEGORY } from './category-list';
import { Promotion } from './promotion';
import { PROMOTIONS } from './promotion-list';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) {}

  getArticleList(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost/mercadona/articles").pipe(
      tap((articleList) => console.table((articleList)),
      catchError((error) => {
        console.log(error);
        return of([]);
      }))
    )    
  }

  getArticleById(articleId: number): Article|undefined {
    return ARTICLES.find(article => article.id == articleId)
  }

  getCategoryList(): Category[] {
    return CATEGORY
  }

  getCategoryById(categoryId: number): Category|undefined {
    return CATEGORY.find(category => category.id == categoryId)
  }

  getCategoryByLibele(categoryLibele: string): Category|undefined {
    return CATEGORY.find(category => category.libele == categoryLibele)
  }

  getPromotionList(): Promotion[] {
    return PROMOTIONS
  }

  getPromotionById(promotionId: number): Promotion|undefined {
    return PROMOTIONS.find(promotion => promotion.id == promotionId)
  }

  deletePromotion(promo_id: number): void {
    PROMOTIONS.forEach((promo, index) => {
      if (promo.id === promo_id) {
        PROMOTIONS.splice(index, 1);
      }
    });
  }
}
