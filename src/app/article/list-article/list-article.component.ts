import { Component } from '@angular/core';
import { Article } from '../article';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Categorie } from '../categorie';

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
