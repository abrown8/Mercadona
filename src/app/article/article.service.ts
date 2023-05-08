import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './article';
import { Categorie } from './categorie';
import { Promotion } from './promotion';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  private handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }

  getArticleList(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:8080/article").pipe(
      catchError((error) => this.handleError(error, []))
    );   
  }
  

  getArticleById(articleId: number): Observable<Article|undefined> {
    return this.http.get<Article>(`http://localhost:8080/article/${articleId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );    
  }

  updateArticle(article: Article): Observable<Article|undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put("http://localhost:8080/article", article, httpOptions).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }

  getCategorieList(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>("http://localhost:8080/categorie").pipe(
      catchError((error) => this.handleError(error, []))
    );   
  }

  getCategorieById(categorieId: number): Observable<Categorie|undefined> {
    return this.http.get<Categorie>(`http://localhost:8080/categorie/${categorieId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );    
  }

  getCategorieByLibele(categorieLibele: string): Observable<Categorie|undefined> {
    return this.http.get<Categorie>(`http://localhost:8080/categorie/${categorieLibele}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );        
  }

  updateCategorie(categorie: Categorie): Observable<Categorie|undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put("http://localhost:8080/categorie", categorie, httpOptions).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }


  getPromotionList(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>("http://localhost:8080/promotion").pipe(
      catchError((error) => this.handleError(error, []))
    );   
  }

  getPromotionById(promotionId: number): Observable<Promotion|undefined> {
    return this.http.get<Promotion>(`http://localhost:8080/promotion/${promotionId}`).pipe(
      catchError((error) => this.handleError(error, undefined))
    );    
  }

  updatePromotion(promotion: Promotion): Observable<Promotion|undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put("http://localhost:8080/promotion", promotion, httpOptions).pipe(
      catchError((error) => this.handleError(error, undefined))
    );
  }


  deletePromotionById(promotionId: number): Observable<null> {
    return this.http.delete(`http://localhost:8080/promotion/${promotionId}`).pipe(
      catchError((error) => this.handleError(error, null))
    );
  }
}
