import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListArticleComponent } from './list-article.component';
import { ArticleService } from '../article.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Article } from '../article';
import { Categorie } from '../categorie';
import { of } from 'rxjs';

describe('ListArticleComponent', () => {
  let component: ListArticleComponent;
  let fixture: ComponentFixture<ListArticleComponent>;
  let articleService: ArticleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArticleComponent ],
      providers: [ ArticleService ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
    articleService = TestBed.inject(ArticleService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve article list and set filtered article list', () => {
    const mockArticles: Article[] = [
      new Article('Article 1', 'Description 1', 'Image 1', 10, new Categorie('Categorie 1'), articleService),
      new Article('Article 2', 'Description 2', 'Image 2', 20, new Categorie('Categorie 2'), articleService),
      new Article('Article 3', 'Description 3', 'Image 3', 30, new Categorie('Categorie 1'), articleService),
    ];
    jest.spyOn(articleService, 'getArticleList').mockReturnValue(of(mockArticles));
    jest.spyOn(component, 'initFilteredArticleList');

    component.ngOnInit();

    expect(articleService.getArticleList).toHaveBeenCalled();
    expect(component.articleList).toEqual(mockArticles);
    expect(component.initFilteredArticleList).toHaveBeenCalled();
  });

  it('should retrieve categorie list', () => {
    const mockCategories: Categorie[] = [
        new Categorie('Categorie 1'),
        new Categorie('Categorie 2'),
        new Categorie('Categorie 3'),
    ];
    jest.spyOn(articleService, 'getCategorieList').mockReturnValue(of(mockCategories));

    component.ngOnInit();

    expect(articleService.getCategorieList).toHaveBeenCalled();
    expect(component.categorieList).toEqual(mockCategories);
  });
});