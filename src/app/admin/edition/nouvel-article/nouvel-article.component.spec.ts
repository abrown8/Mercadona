import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NouvelArticleComponent } from './nouvel-article.component';
import { ArticleService } from '../../../article/article.service'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Article } from '../../../article/article';
import { Categorie } from '../../../article/categorie';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';


describe('NouvelArticleComponent', () => {
    let component: NouvelArticleComponent;
    let fixture: ComponentFixture<NouvelArticleComponent>;
    let articleService: ArticleService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ NouvelArticleComponent ],
            providers: [ ArticleService ],
            imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ]
        })
        .compileComponents();
        articleService = TestBed.inject(ArticleService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NouvelArticleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve article and categorie list', () => {
        const mockArticles: Article[] = [
            new Article('Article 1', 'Description 1', 'Image 1', 10, new Categorie('Categorie 1'), articleService),
            new Article('Article 2', 'Description 2', 'Image 2', 20, new Categorie('Categorie 2'), articleService),
            new Article('Article 3', 'Description 3', 'Image 3', 30, new Categorie('Categorie 1'), articleService),
        ];
        const mockCategories: Categorie[] = [
            new Categorie('Categorie 1'),
            new Categorie('Categorie 2'),
            new Categorie('Categorie 3'),
        ];
        jest.spyOn(articleService, 'getArticleList').mockReturnValue(of(mockArticles));
        jest.spyOn(articleService, 'getCategorieList').mockReturnValue(of(mockCategories));
        component.ngOnInit();

        expect(articleService.getArticleList).toHaveBeenCalled();
        expect(component.articleList).toEqual(mockArticles);
        expect(articleService.getCategorieList).toHaveBeenCalled();
        expect(component.categorieList).toEqual(mockCategories);
    });
});