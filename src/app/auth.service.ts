import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  login(email: string, password: string): Observable<boolean> {
    console.log("Run login de auth.service.ts avec email=" + email + " et motdepasse=" + password);
    const isLoggedIn = (email === "adrien.brown98@gmail.com" && password === "admin");
  
    return of(isLoggedIn).pipe(
      delay(500),
      tap(isLoggedIn => {
        this.isLoggedIn == isLoggedIn;
      })
    );
  }
  

  logout() {
    this.isLoggedIn = false;
  }
}
