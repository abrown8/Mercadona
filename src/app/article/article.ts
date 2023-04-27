import { Category } from "./category";
import { CATEGORY } from "./category-list";
import { Promotion } from "./promotion";
import { PROMOTIONS } from "./promotion-list";

export class Article {
    id: number;
    libele: string;
    description: string;
    image: string;
    prix: number;
    category_id: number;


    constructor(id: number, libele: string, description: string, image: string, prix: number, category_id: number) {
      this.id = id;
      this.libele = libele;
      this.description = description;
      this.image = image;
      this.prix = prix;
      this.category_id = category_id;
  }
  
    public getCategoryLibele(): string|undefined {
      const cat: Category|undefined = CATEGORY.find(category => category.id == this.category_id)
      return cat?.libele;
    }

    public getPromotion(): Promotion | undefined {
      return PROMOTIONS.find(promo => promo.article_id == this.id);
    }
    


    
}
