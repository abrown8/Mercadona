import { Component } from '@angular/core';
import { Article } from '../article';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Promotion } from '../promotion';
import { Category } from '../category';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',

})
export class ListArticleComponent {
  articleList: Article[];
  filteredArticleList: Article[];
  categoryList: Category[];
  selectedCategory: Category|undefined;

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.articleList = this.articleService.getArticleList();
    this.filteredArticleList = this.articleList;
    this.categoryList = this.articleService.getCategoryList();
  }

  getReducePrice(article: Article): number {
    const promo: Promotion|undefined = article.getPromotion();
    if(promo) {
      return article.prix - (article.prix * (promo.pourcentage_remise / 100));
    }
    return 0;
  }

  onCategorySelected(event: Event) {
    const selectedLibele: string = (event.target as HTMLInputElement).value;
    this.selectedCategory = this.articleService.getCategoryByLibele(selectedLibele);
    this.filterArticleList(this.selectedCategory)
    
  }

  filterArticleList(category: Category|undefined) {
    if (category) {
      this.filteredArticleList = this.articleList.filter(article => article.category_id === category.id);
    }
    else {
      this.filteredArticleList = this.articleList;
    }
  }
  
  
  
}
