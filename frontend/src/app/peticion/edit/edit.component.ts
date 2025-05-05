import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionService } from '../peticion.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  peticionId: number | null = null;
  files: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private peticionService: PeticionService
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: ['', [Validators.required]],
      destinatario: ['', [Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    this.peticionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.peticionId) {
      this.peticionService.view(this.peticionId).subscribe(
        (data) => {
          this.form.patchValue({
            titulo: data.titulo,
            descripcion: data.descripcion,
            destinatario: data.destinatario,
          });
        },
        (error) => {
          console.error('Error al cargar la petición:', error);
        }
      );
    }
  }

  onFileChange(event: any): void {
    if (event.target.files) {
      this.files = Array.from(event.target.files);
    }
  }
  
  updatePetition(): void {
    if (this.peticionId && this.form.valid) {
      const data = {
        titulo: this.form.get('titulo')?.value || '',
        descripcion: this.form.get('descripcion')?.value || '',
        destinatario: this.form.get('destinatario')?.value || '',
      };
  
      console.log('Datos enviados al backend:', data);
  
      this.peticionService.updatePeticion(this.peticionId, data).subscribe(
        (response) => {
          console.log('Respuesta del backend:', response);
          alert('Petición actualizada con éxito.');
          this.router.navigate(['/peticiones']);
        },
        (error) => {
          console.error('Error al actualizar la petición:', error);
          alert('Error al actualizar la petición.');
        }
      );
    } else {
      console.error('Formulario inválido o ID no definido');
    }
  }
}