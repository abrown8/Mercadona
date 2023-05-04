import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article.service';
import { Categorie } from 'src/app/article/categorie';

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
        console.log(this.articleList)
      });
  this.articleService.getCategorieList()
      .subscribe(categorieList => {
        this.categorieList = categorieList;
        console.log(this.categorieList)
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
        console.log("dans onCategorie Selected : ",this.formCategorie)
  });
    }
  }

  back() {
    this.router.navigate(['/admin'])
  }

  saveForm(): void {
    console.log(this.formLibele)
    console.log(this.formDescription)
    console.log(this.formImage)
    console.log(this.formPrix)
  
    if (!this.formLibele || !this.formDescription || !this.formImage || !this.formPrix || !this.formCategorie) {
      //alert("Veuillez remplir tous les champs")
      return;
    }

    console.log("ajout de l'article avec l'id de la categorie qui sera ",this.formCategorie.id)
  
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
        console.log('Article ajouté :', newArticle);
      });

    this.back()
  }


}


