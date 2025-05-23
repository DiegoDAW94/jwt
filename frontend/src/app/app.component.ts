import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ChangeOrg';
  isSignedIn!: boolean;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) {}

  ngOnInit() {
    this.auth.isLoggedIn.subscribe((val) => {
      this.isSignedIn = val;
    });

    if (localStorage.getItem('auth_token')) {
      this.auth.setAuthState(true);
    }
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['']);
  }
}