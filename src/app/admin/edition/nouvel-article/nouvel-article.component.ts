import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../article/article';
import { ArticleService } from '../../../article/article.service';
import { Categorie } from '../../../article/categorie';

@Component({
  selector: 'app-nouvel-article',
  templateUrl: './nouvel-article.component.html',
  styles: [
  ]
})
export class NouvelArticleComponent {
  articleList: Article[];
  categorieList: Categorie[];
  formLibele: string;
  formDescription: string;
  formImage: string;
  formPrix: number;
  formCategorie: Categorie|undefined;



  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private articleService: ArticleService
  ) { }

 
  ngOnInit(): void {
    this.articleService.getArticleList()
      .subscribe(articleList => {
        this.articleList = articleList;
      });
  this.articleService.getCategorieList()
      .subscribe(categorieList => {
        this.categorieList = categorieList;
  });
  } 

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.formImage = reader.result as string;
    };
  }
  
  

  onCategorieSelected(event: any) {
    const categorieId = event.target.value;
    if (!categorieId || categorieId === 'Open this select menu') {
      this.formCategorie = undefined;
    } else {
      this.articleService.getCategorieById(categorieId)
      .subscribe(formCategorie => {
        this.formCategorie = formCategorie;
  });
    }
  }

  back() {
    this.router.navigate(['/admin'])
  }

  saveForm(): void {
  
    if (!this.formLibele || !this.formDescription || !this.formImage || !this.formPrix || !this.formCategorie) {
      return;
    } 
    const newArticle = new Article(
      this.formLibele,
      this.formDescription,
      this.formImage,
      this.formPrix,
      this.formCategorie,
      this.articleService
  );
  
    this.articleService.updateArticle(newArticle)
      .subscribe((newArticle) => {
      });

    this.back()
  }


}


