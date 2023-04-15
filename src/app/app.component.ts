import { Component, OnInit } from '@angular/core';
import { ARTICLES } from './article-list';
import { Article } from './article';

@Component({
  selector: 'app-root',
  template: `
    <h1>Liste des articles</h1>
      <div class="container">
        <div class="row">
          <div class="col-xl-2 col-lg-4 col-md-6 col-sm-12" *ngFor="let article of articleList">
            <div class="card">
              <img class="card-img-top" [src]="article.image" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">{{article.libele}}</h5>
                <p class="card-text">{{article.description}}</p>
                <p class="card-text">Prix: {{article.prix}} €</p>
                <p class="card-text">Catégorie: {{article.categorie}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  `,

})
export class AppComponent implements OnInit {
  articleList: Article[] = ARTICLES

  ngOnInit() {
    console.table(this.articleList);
  }
}
