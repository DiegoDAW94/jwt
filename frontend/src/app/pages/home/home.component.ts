import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { AuthStateService } from '../../shared/auth-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn = false;

  constructor(private authService: AuthService, private authStateService: AuthStateService, private router: Router) {}

  ngOnInit(): void {
    this.authStateService.isLoggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  startPetition(): void {
    if (this.loggedIn) {
      this.router.navigate(['/peticiones/create']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}