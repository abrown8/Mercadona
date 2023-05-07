import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  isLoggedIn: boolean = false;
  redirectUrl: string;
  token: string;

  login(email: string, password: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const credentials = { email: email, password: password };
    return this.http.post<any>('http://localhost:8080/auth', credentials, httpOptions).pipe(
      tap((response) => {
        if (response != null){
          this.isLoggedIn = true;
        }
        else{
          alert("Identifiants incorrects, veuillez réessayer")
          this.isLoggedIn = false;
        }
      }),
      mapTo(true),
      catchError((error) => {
        console.error(error);
        this.isLoggedIn = false;
        return of(false);
      })
    );
  }
  

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('authToken');
  }
}

