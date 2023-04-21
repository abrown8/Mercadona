import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ActivatedRoute, Router } from '@angular/router';
import { ARTICLES } from '../article-list';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
})
export class DetailArticleComponent implements OnInit {
  
  articleList: Article[];
  article: Article|undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.articleList = ARTICLES;
    const articleId: string|null = this.route.snapshot.paramMap.get('id');

    if(articleId){
      this.article = this.articleList.find(article => article.id == +articleId)
    }    
  }

  goHome(){
    this.router.navigate(['/articles']);
  }
  

}
