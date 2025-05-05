import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  peticiones: Peticion[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private peticionService: PeticionService) {}

  ngOnInit(): void {
    this.loadPeticiones();
  }

  loadPeticiones(page: number = 1): void {
    this.peticionService.getMyPeticiones(page).subscribe(
      (data) => {
        this.peticiones = data.data; // Los datos de la página actual
        this.currentPage = data.current_page;
        this.totalPages = data.last_page;
      },
      (error) => {
        console.error('Error al cargar mis peticiones:', error);
      }
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadPeticiones(page);
    }
  }
}