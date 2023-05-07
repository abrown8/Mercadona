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
  promotion: Observable<Promotion|undefined>;
  categorieLibele: Observable<string|undefined>;
  prix_reduit: Observable<number|null>;

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
    this.promotion = this.getPromotion();
    this.categorieLibele = this.getCategorieLibele();
    this.prix_reduit = this.getPrixReduit();
  }
 
  private getCategorieLibele(): Observable<string|undefined> {
    return this.articleService.getCategorieList().pipe(
      map((categorieList: Categorie[]) => {
        const cat: Categorie|undefined = categorieList.find(categorie => categorie.id === this.categorie.id);
        return cat?.libele;
      })
    );
  }

  private getPromotion(): Observable<Promotion|undefined> {
    console.log(this.libele)
    return this.articleService.getPromotionList().pipe(
      map((promotionList: Promotion[]) => {
        const promotion: Promotion|undefined = promotionList.find(promotion => promotion.article.id === this.id);
        return promotion;
      })
    );
  }

  private getPrixReduit(): Observable<number|null> {
    return this.promotion.pipe(
      map((promotion: Promotion|undefined) => {
        if (promotion && promotion.pourcentage_remise) {
          return this.prix * (100 - promotion.pourcentage_remise) / 100;
        }
        return null;
      })
    );
  }
}
