import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './article';
import { Categorie } from './categorie';
import { Promotion } from './promotion';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  private log(response: any) {
    //console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }

  getArticleList(): Observable<Article[]> {
    console.log("GET ARTICLE LIST - article service")
    return this.http.get<Article[]>("http://localhost:8080/article").pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );   
  }

  getArticleById(articleId: number): Observable<Article|undefined> {
    console.log("GET ARTICLE BY ID - article service, ",`http://localhost:8080/article/${articleId}`)
    return this.http.get<Article>(`http://localhost:8080/article/${articleId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );    
  }

  updateArticle(article: Article): Observable<Article|undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(article)
    return this.http.put("http://localhost:8080/article", article, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  // updateArticle(article: Article): Observable<Article|undefined> {
  //   const formData = new FormData();
  //   formData.append('libele', article.libele);
  //   formData.append('description', article.description);
  //   formData.append('image', article.image);
  //   formData.append('prix', article.prix.toString());
  //   formData.append('categorie', article.categorie.toString());
    
  
  //   return this.http.put<Article>("http://localhost:8080/article", formData).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error) => this.handleError(error, undefined))
  //   );
  // }

  




  getCategorieList(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>("http://localhost:8080/categorie").pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );   
    
    //return CATEgorie
  }

  getCategorieById(categorieId: number): Observable<Categorie|undefined> {
    console.log("GET CATEGORIE BY ID - article service, ",`http://localhost:8080/categorie/${categorieId}`)
    return this.http.get<Categorie>(`http://localhost:8080/categorie/${categorieId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );    
  }

  getCategorieByLibele(categorieLibele: string): Observable<Categorie|undefined> {
    return this.http.get<Categorie>(`http://localhost:8080/categorie/${categorieLibele}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );    
    
    //return CATEgorie.find(categorie => categorie.libele == categorieLibele)
  }

  updateCategorie(categorie: Categorie): Observable<Categorie|undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put("http://localhost:8080/categorie", categorie, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }


  getPromotionList(): Observable<Promotion[]> {
    console.log("GET PROMO LIST")
    return this.http.get<Promotion[]>("http://localhost:8080/promotion").pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );   
  }

  getPromotionById(promotionId: number): Observable<Promotion|undefined> {
    console.log("GET PROMO BY ID")
    return this.http.get<Promotion>(`http://localhost:8080/promotion/${promotionId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );    

    //return PROMOTIONS.find(promotion => promotion.id == promotionId)
  }

  updatePromotion(promotion: Promotion): Observable<Promotion|undefined> {
    console.log("update promotion played in articleserv")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put("http://localhost:8080/promotion", promotion, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }


  deletePromotionById(promotionId: number): Observable<null> {
    return this.http.delete(`http://localhost:8080/promotion/${promotionId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }
}
