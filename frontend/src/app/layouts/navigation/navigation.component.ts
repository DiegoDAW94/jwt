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
  isAdmin = false;

  constructor(private authService: AuthService, private authStateService: AuthStateService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    this.authStateService.isLoggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;

      if (loggedIn) {
        // Obtener el rol del usuario
        this.authService.getUser().subscribe(user => {
          this.isAdmin = user.role_id === 1; // Verificar si el role_id es 1
        });
      } else {
        this.isAdmin = false;
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.authStateService.setAuthState(false);
      this.isAdmin = false;
      this.router.navigate(['/login']);
    });
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}