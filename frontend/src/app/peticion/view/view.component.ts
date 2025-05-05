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
    if (id) {
      this.peticionService.view(Number(id)).subscribe(
        (data) => {
          this.peticion = data;
          // Ajustar las rutas de las imágenes para que apunten a la carpeta pública
          if (this.peticion.files) {
            this.peticion.files = this.peticion.files.map((file) => ({
              ...file,
              file_path: `http://127.0.0.1:8000/storage/uploads/${file.name}`
            }));
          }
        },
        (error) => {
          console.error('Error al cargar la petición:', error);
        }
      );
    }

    this.authService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.loggedIn = true;
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
        this.loggedIn = false;
      }
    );
  }

  signPetition(): void {
    if (this.peticion) {
      this.peticionService.sign(this.peticion.id!).subscribe(
        (response) => {
          console.log('Respuesta del backend:', response);
          this.peticion!.firmantes! += 1;
          alert(response.message || '¡Has firmado la petición con éxito!');
        },
        (error) => {
          console.error('Error al firmar la petición:', error);
          alert('Error al firmar la petición: ' + error.error.message || error.message);
        }
      );
    }
  }

  deletePetition(): void {
    if (this.peticion) {
      this.peticionService.delete(this.peticion.id!).subscribe(() => {
        this.router.navigate(['/peticiones']);
      });
    }
  }

  editPetition(): void {
    if (this.peticion && this.peticion.id) {
      this.router.navigate([`/peticiones/edit/${this.peticion.id}`]);
    } else {
      console.error('Petición o ID no definido');
    }
  }
  changeState(): void {
    if (this.peticion && this.peticion.id) {
      this.peticionService.changeState(this.peticion.id).subscribe(
        (response: any) => {
          alert('Estado cambiado con éxito.');
          if (this.peticion) {
            this.peticion.estado = response.estado; // Actualizar el estado en la vista
          }
        },
        (error: any) => {
          console.error('Error al cambiar el estado:', error);
          alert('Error al cambiar el estado.');
        }
      );
    }
  }
}