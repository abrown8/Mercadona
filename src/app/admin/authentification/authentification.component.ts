import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html'
})
export class AuthentificationComponent {
  email: string;
  password: string;
  auth: AuthService;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.auth = this.authService;
  }
  
  goHome(){
    this.ngZone.run(() => {
      this.router.navigate(['/catalogue'])
    });
  }

  login() {
    this.auth.login(this.email, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.ngZone.run(() => {
          this.router.navigate(['/admin'])
        });
      })
  }

}
