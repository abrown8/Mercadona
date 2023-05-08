import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { AuthentificationComponent } from './authentification.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AuthentificationComponent', () => {
  let component: AuthentificationComponent;
  let fixture: ComponentFixture<AuthentificationComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthentificationComponent ],
      providers: [ AuthService, Router ],
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ]
    })
    .compileComponents();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page when goHome() is called', () => {
    const spy = jest.spyOn(router, 'navigate');
    component.goHome();
    expect(spy).toHaveBeenCalledWith(['/catalogue']);
  });

  it('should try to navigate to admin page', () => {
    const authServiceSpy = jest.spyOn(authService, 'login').mockReturnValue(of(false));
    const routerSpy = jest.spyOn(router, 'navigate');
    component.email = 'test@test.com';
    component.password = 'testpassword';
    component.login();
    expect(authServiceSpy).toHaveBeenCalledWith('test@test.com', 'testpassword');
    expect(routerSpy).toHaveBeenCalledWith(['/admin']);
  });

});
