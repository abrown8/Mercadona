import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if(this.authService.isLoggedIn) {
      console.log("Vous etes bien authentifié pour le guard")
      return true;
    }
    alert("Vous n'avez pas les droits pour accéder à cette page, veuillez vous connecter.")
    this.router.navigate(['/admin-login'])
    return false;
  }
  
}
