import { Article } from "./article";

export class Promotion {
    id: number|null;
    date_debut: Date;
    date_fin: Date;
    pourcentage_remise: number;
    article: Article;


    constructor(date_debut: Date, date_fin: Date, pourcentage_remise: number, article: Article) {
      this.date_debut = date_debut;
      this.date_fin = date_fin;
      this.pourcentage_remise = pourcentage_remise;
      this.article = article;


  }
  
}
