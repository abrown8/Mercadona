import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article.service';
import { Category } from 'src/app/article/category';

@Component({
  selector: 'app-nouvel-article',
  templateUrl: './nouvel-article.component.html',
  styles: [
  ]
})
export class NouvelArticleComponent {
  articleList: Article[];
  categoryList: Category[];
  formLibele: string;
  formDescription: string;
  formImage: string;
  formPrix: number;
  formCategory: Category|undefined;



  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleList = this.articleService.getArticleList();
    this.categoryList = this.articleService.getCategoryList();
  }

  onImageSelected(event: any): void {
    if (event.target.files[0]) {
      const file = event.target.files[0];
    console.log(file)
    this.formImage = file.name;
    }
    else {
      this.formImage = "";
    }    
  }
  

  onCategorySelected(event: any) {
    const categoryId = event.target.value;
    if (!categoryId || categoryId === 'Open this select menu') {
      this.formCategory = undefined;
    } else {
      this.formCategory = this.articleService.getCategoryById(categoryId);
    }
  }

  back() {
    this.router.navigate(['/admin'])
  }

  onSubmit(): void {
    console.log(this.formLibele)
    console.log(this.formDescription)
    console.log(this.formImage)
    console.log(this.formPrix)
    
    if (!this.formLibele || !this.formDescription || !this.formImage || !this.formPrix ||  !this.formCategory) {
      alert("Veuillez remplir tous les champs")
      return;
    }

    const lastArticle = this.articleList[this.articleList.length - 1];
    const newId = lastArticle ? lastArticle.id + 1 : 1;
    const newArticle = new Article(
      newId,
      this.formLibele,
      this.formDescription,
      this.formImage,
      this.formPrix,
      this.formCategory.id
    );
    this.articleList.push(newArticle);
    this.back()
  }

  //new Article(1, "Le Petit Prince", "Un livre de Saint-Exupéry", "../assets/nutella.jpg", 10.99, 1),
}


