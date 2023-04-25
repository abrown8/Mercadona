import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
})
export class DetailArticleComponent implements OnInit {
  
  articleList: Article[];
  article: Article|undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleList = this.articleService.getArticleList();
    const articleId: string|null = this.route.snapshot.paramMap.get('id');    
    if(articleId){
      this.article = this.articleService.getArticleById(+articleId)
    }    
  }

  goHome(){
    this.router.navigate(['/catalogue']);
  }
  

}
