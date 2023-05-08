import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Article } from '../../../article/article';
import { ArticleService } from '../../../article/article.service';
import { EditionPromoComponent } from './edition-promo.component';
import { Categorie } from '../../../article/categorie';
import { Promotion } from '../../../article/promotion';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('EditionPromoComponent', () => {
    let component: EditionPromoComponent;
    let fixture: ComponentFixture<EditionPromoComponent>;
    let router: Router;
    let articleService: ArticleService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          declarations: [ EditionPromoComponent ],
          providers: [ ArticleService ],
          imports: [ RouterTestingModule, HttpClientTestingModule ]
        })
        .compileComponents();
        articleService = TestBed.inject(ArticleService)
      });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditionPromoComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve promotion list', () => {

        const mockArticles: Article[] = [
            new Article('Article 1', 'Description 1', 'Image 1', 10, new Categorie('Categorie 1'), articleService),
            new Article('Article 2', 'Description 2', 'Image 2', 20, new Categorie('Categorie 2'), articleService),
            new Article('Article 3', 'Description 3', 'Image 3', 30, new Categorie('Categorie 1'), articleService),
        ];

        const mockPromotion: Promotion[] = [
            new Promotion(new Date(), new Date(), 10, mockArticles[0]),
            new Promotion(new Date(), new Date(), 20, mockArticles[1]),
            new Promotion(new Date(), new Date(), 40, mockArticles[2])
        ];
        
        jest.spyOn(articleService, 'getPromotionList').mockReturnValue(of(mockPromotion));
        component.ngOnInit();

        expect(articleService.getPromotionList).toHaveBeenCalled();
        expect(component.promotionList).toEqual(mockPromotion);
    });

    it('should navigate back to /admin', () => {
        const spy = jest.spyOn(router, 'navigate');
        component.back();
        expect(spy).toHaveBeenCalledWith(['/admin']);
    });
});