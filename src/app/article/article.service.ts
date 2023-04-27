import { Injectable } from '@angular/core';
import { Article } from './article';
import { ARTICLES } from './article-list';
import { Category } from './category';
import { CATEGORY } from './category-list';
import { Promotion } from './promotion';
import { PROMOTIONS } from './promotion-list';

@Injectable()
export class ArticleService {

  getArticleList(): Article[] {
    return ARTICLES
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
