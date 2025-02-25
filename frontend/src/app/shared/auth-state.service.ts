import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.isLoggedIn() || false);

  constructor(private tokenService: TokenService) {}

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setAuthState(value: boolean): void {
    this.loggedIn.next(value);
  }
}