import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { AuthStateService } from '../../shared/auth-state.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedIn = false;

  constructor(private authService: AuthService, private authStateService: AuthStateService, private router: Router) {}

  ngOnInit(): void {
    this.authStateService.isLoggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.authStateService.setAuthState(false);
      this.router.navigate(['/login']);
    });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}