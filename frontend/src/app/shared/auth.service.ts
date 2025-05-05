import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private apiUrl = 'http://127.0.0.1:8000/api'; // Cambia esto a la URL de tu backend

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // User registration
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  // Check if user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.http.get<{ loggedIn: boolean }>(`${this.apiUrl}/auth/status`).pipe(
      map(response => response.loggedIn)
    );
  }
  
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`); // Endpoint para obtener los datos del usuario autenticado
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}