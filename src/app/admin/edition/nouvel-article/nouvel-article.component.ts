import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/article/article';
import { ArticleService } from 'src/app/article/article.service';

@Component({
  selector: 'app-nouvel-article',
  templateUrl: './nouvel-article.component.html',
  styles: [
  ]
})
export class NouvelArticleComponent {
  articleList: Article[];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleList = this.articleService.getArticleList();
    console.log("hello world")
  }
}
