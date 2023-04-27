import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article.service';
import { Promotion } from 'src/app/article/promotion';

@Component({
  selector: 'app-edition-promo',
  templateUrl: './edition-promo.component.html',
})
export class EditionPromoComponent {
  articleList: Article[];
  article: Article|undefined;
  promotionList: Promotion[];
  promotionEnCours: Promotion|undefined;
  promotionEnCours_remise: number
  promotionEnCours_date_debut: Date
  promotionEnCours_date_debut_str: string
  promotionEnCours_date_fin: Date
  promotionEnCours_date_fin_str: string
  pourcentages: number[] = [10, 20, 30, 40, 50];


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleList = this.articleService.getArticleList();
    this.promotionList = this.articleService.getPromotionList();
    const articleId: string|null = this.route.snapshot.paramMap.get('id');    
    if(articleId){
      this.article = this.articleService.getArticleById(+articleId)
      if (this.article) {
        this.promotionEnCours = this.article.getPromotion();
        if (this.promotionEnCours) {
          this.promotionEnCours_remise = this.promotionEnCours.pourcentage_remise
          this.promotionEnCours_date_debut = this.convertStringToDate(this.promotionEnCours.date_debut)
          this.promotionEnCours_date_debut_str = this.promotionEnCours_date_debut.toISOString().substring(0, 10);
          this.promotionEnCours_date_fin = this.convertStringToDate(this.promotionEnCours.date_fin)
          this.promotionEnCours_date_fin_str = this.promotionEnCours_date_fin.toISOString().substring(0, 10);
        }
      }
    }  
  }

  convertStringToDate(strDate: string): Date {
    const dateParts = strDate.split("/");
    const year = Number(dateParts[2]);
    const month = Number(dateParts[1]) - 1; // mois commence à 0 dans Date
    const day = Number(dateParts[0]) + 1; // jour commence à 2 dans Date
    return new Date(year, month, day);
  }
  
  

  formatDateToString(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  dateFormater(formDate: string): string {
    const dateParts = formDate.split("-");
    return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]
  }
  
  
  
  getReducePrice(article: Article): number {
    const promo: Promotion|undefined = article.getPromotion();
    if(promo) {
      return article.prix - (article.prix * (promo.pourcentage_remise / 100));
    }
    return 0;
  }
  
  back() {
    this.router.navigate(['/admin'])
  }

  onSubmit() {
    const lastPromotion = this.promotionList[this.promotionList.length - 1];
    const newId = lastPromotion ? lastPromotion.id + 1 : 1;
    
    if (this.article) {
      const existingPromotion = this.promotionList.find(promo => promo.article_id === this.article?.id);
      if (existingPromotion) {
        // Si une promotion existe, la supprimer de la liste
        const index = this.promotionList.indexOf(existingPromotion);
        if (index > -1) {
          this.promotionList.splice(index, 1);
        }
      }

      const newPromotion = new Promotion(
        newId,
        this.dateFormater(this.promotionEnCours_date_debut_str),
        this.dateFormater(this.promotionEnCours_date_fin_str),
        this.promotionEnCours_remise,
        this.article.id
      );
      this.promotionList.push(newPromotion);
    }
    this.back()
  }
  
  
}
