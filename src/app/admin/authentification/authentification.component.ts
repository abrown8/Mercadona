import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.auth = this.authService;
  }
  
  goHome(){
    this.router.navigate(['/catalogue']);
  }

  login() {
    this.auth.login(this.email, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.router.navigate(["/admin"]);
      })
  }

}
