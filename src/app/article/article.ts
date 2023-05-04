import { Observable, map } from "rxjs";
import { ArticleService } from "./article.service";
import { Categorie } from "./categorie";
import { Promotion } from "./promotion";

export class Article {
  id?: number|null;
  libele: string;
  description: string;
  image: string;
  prix: number;
  categorie: Categorie;

  constructor(
    libele: string,
    description: string,
    image: string,
    prix: number,
    categorie: Categorie,
    private articleService: ArticleService
  ) {
    this.id = null;
    this.libele = libele;
    this.description = description;
    this.image = image;
    this.prix = prix;
    this.categorie = categorie;
  }
 
  private categorieLibele$: Observable<string|undefined>;

  public getCategorieLibele(): Observable<string|undefined> {
    if (!this.categorieLibele$) {
      console.log("GET CATEGORIE LIBELE")
      this.categorieLibele$ = this.articleService.getCategorieList().pipe(
        map((categorieList: Categorie[]) => {
          const cat: Categorie|undefined = categorieList.find(categorie => categorie.id === this.categorie.id);
          return cat?.libele;
        })
      );
    }
    return this.categorieLibele$;
  }

  private promotion$: Observable<Promotion|undefined>;

  public getPromotion(): Observable<Promotion|undefined> {
    if (!this.promotion$) {
      console.log("GET PROMOTION")
      this.promotion$ = this.articleService.getPromotionList().pipe(
        map((promotionList: Promotion[]) => {
          const promotion: Promotion|undefined = promotionList.find(promotion => promotion.article.id === this.id);
          return promotion;
        })
      );
    }
    return this.promotion$;
  }
}



  // public getCategorieLibele(categorieList: Categorie[]): string|undefined {
  //   console.log("GET CATEGORIE LIBELE")
  //   const cat: Categorie|undefined = categorieList.find(categorie => categorie.id === this.categorie.id);
  //   return cat?.libele;
  // }
  



  // public getPromotion(): Promotion | undefined {   
  //   console.log("GET PROMOTION")
  //   let promotion: Promotion | undefined;
  //   this.articleService.getPromotionList()
  //       .subscribe(promotionList => {
  //         if (promotionList.length > 0) {
  //           promotion = promotionList.find(promo => promo.article.id == this.id);
  //         } else {
  //           promotion = undefined;
  //         }
  //       });
  //   return promotion;
  //}