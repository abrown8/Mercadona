import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EditionComponent } from './edition.component';
import { ArticleService } from '../../article/article.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Article } from '../../article/article'
import { Categorie } from '../../article/categorie';
import { Promotion } from '../../article/promotion';
import { of } from 'rxjs';



describe('EditionComponent', () => {
  let component: EditionComponent;
  let fixture: ComponentFixture<EditionComponent>;
  let router: Router;
  let articleService: ArticleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionComponent ],
      providers: [ ArticleService ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
    articleService = TestBed.inject(ArticleService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should navigate to /admin/nouvel-article', () => {
    const spy = jest.spyOn(router, 'navigate');
    component.nouvelArticle();
    expect(spy).toHaveBeenCalledWith(['/admin/nouvel-article']);
  });

  it('should navigate to /admin/articleId when editPromotion() is called', () => {
    const article = new Article('Test Article', 'Test Description', 'Test Image', 10, new Categorie("Test Categorie"), articleService);
    article.id = 1;
    const spy = jest.spyOn(router, 'navigate');
    component.editPromotion(article);
    expect(spy).toHaveBeenCalledWith(['/admin', article.id]);
  });

  it('should navigate to /catalogue when logout() is called', () => {
      const spy = jest.spyOn(router, 'navigate');
      component.logout();
      expect(spy).toHaveBeenCalledWith(['/catalogue']);
  });

  it('should delete promotion by ID', () => {

    const mockArticle: Article = new Article('Article 1', 'Description 1', 'Image 1', 10, new Categorie('Categorie 1'), articleService);


    const mockPromotion: Promotion = new Promotion(new Date(), new Date(), 10, mockArticle)
    mockPromotion.id = 1;
  
    mockArticle.promotion = of(mockPromotion);

    jest.spyOn(articleService, 'deletePromotionById').mockReturnValue(of(null));

    component.deletePromotion(mockArticle);

    expect(articleService.deletePromotionById).toHaveBeenCalledWith(mockPromotion.id);
    mockArticle.promotion.subscribe(promotion => {
      expect(promotion).toBeUndefined();
    });
  });
});
