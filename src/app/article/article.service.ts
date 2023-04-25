import { Injectable } from '@angular/core';
import { Article } from './article';
import { ARTICLES } from './article-list';
import { Category } from './category';
import { CATEGORY } from './category-list';

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
}
