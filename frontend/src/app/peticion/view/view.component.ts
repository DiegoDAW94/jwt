import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../peticion.service';
import { AuthService } from 'src/app/shared/auth.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  peticion: Peticion | null = null;
  user: any; // Información del usuario autenticado
  loggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peticionService: PeticionService,
    private authService: AuthService,
    private authStateService: AuthStateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.peticionService.view(Number(id)).subscribe(data => {
      this.peticion = data;
    });

    this.authStateService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });

    this.authService.getUser().subscribe((user: any) => {
      this.user = user;
    });
  }

  signPetition(): void {
    if (this.peticion) {
      this.peticionService.sign(this.peticion.id!).subscribe(() => {
        this.peticion!.firmantes! += 1;
      });
    }
  }

  deletePetition(): void {
    if (this.peticion) {
      this.peticionService.delete(this.peticion.id!).subscribe(() => {
        this.router.navigate(['/peticiones']);
      });
    }
  }
}