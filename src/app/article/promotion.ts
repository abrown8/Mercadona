import { Article } from "./article";
import { ARTICLES } from "./article-list";

export class Promotion {
    id: number;
    date_debut: string;
    date_fin: string;
    pourcentage_remise: number;
    article_id: number;


    constructor(id: number, date_debut: string, date_fin: string, pourcentage_remise: number, article_id: number) {
      this.id = id;
      this.date_debut = date_debut;
      this.date_fin = date_fin;
      this.pourcentage_remise = pourcentage_remise;
      this.article_id = article_id;
  }
  
    public getArticleLibele(): string|undefined {
      const cat: Article|undefined = ARTICLES.find(article => article.id == this.article_id)
      return cat?.libele;
    }
}
