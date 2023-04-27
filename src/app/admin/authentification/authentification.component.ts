import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html'
})
export class AuthentificationComponent {
  message: string = "Vous êtes déconnecté. (admin/admin)";
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

  setMessage() {
    if(this.auth.isLoggedIn) {
      this.message = "Vous êtes connecté";
    }
    else{
      this.message = "Email ou mot de passe incorrect."
    }
  }

  login() {
    this.message = "Tentative de connexion en cours...";
    this.auth.login(this.email, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        console.log("dans login de autthentification component : "+isLoggedIn)
        if(isLoggedIn) {
          this.router.navigate(["/admin"]);
        }
        else{
          alert("Identifiants incorrects, veuillez réessayer")
          this.password = "";
          this.router.navigate(["/admin-login"]);
        }
        
      })
  }

}
