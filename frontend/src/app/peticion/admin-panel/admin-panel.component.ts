import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionService } from '../peticion.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  peticiones: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private peticionService: PeticionService, private router: Router) {}

  ngOnInit(): void {
    this.loadPeticiones();
  }

  loadPeticiones(page: number = 1): void {
    this.peticionService.getPeticiones(page).subscribe(
      (response: any) => {
        this.peticiones = response.data; // Ajusta según la estructura de tu API
        this.currentPage = response.current_page;
        this.totalPages = response.last_page;
      },
      (error: any) => {
        console.error('Error al cargar las peticiones:', error);
      }
    );
  }

  viewPetition(id: number): void {
    this.router.navigate([`/peticiones/view/${id}`]);
  }

  changeState(id: number): void {
    this.peticionService.changeState(id).subscribe(
      (response: any) => {
        alert('Estado cambiado con éxito.');
        this.loadPeticiones(this.currentPage); // Recargar la página actual
      },
      (error: any) => {
        console.error('Error al cambiar el estado:', error);
        alert('Error al cambiar el estado.');
      }
    );
  }

  editPetition(id: number): void {
    this.router.navigate([`/peticiones/edit/${id}`]);
  }

  deletePetition(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta petición?')) {
      this.peticionService.delete(id).subscribe(
        () => {
          alert('Petición eliminada con éxito.');
          this.loadPeticiones(this.currentPage); // Recargar la página actual
        },
        (error: any) => {
          console.error('Error al eliminar la petición:', error);
          alert('Error al eliminar la petición.');
        }
      );
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadPeticiones(page);
    }
  }
}