import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router
import { PeticionService } from '../peticion.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private peticionService: PeticionService,
    private router: Router // Inyectar Router correctamente
  ) {
    this.createForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      destinatario: ['', Validators.required],
      categoria_id: ['', Validators.required],
      files: [null] // Para manejar los archivos
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const files = event.target.files;
    this.createForm.patchValue({ files: files });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const formData = new FormData();
      Object.keys(this.createForm.value).forEach((key) => {
        if (key === 'files') {
          const files = this.createForm.value[key];
          for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
          }
        } else {
          formData.append(key, this.createForm.value[key]);
        }
      });

      this.peticionService.createPeticion(formData).subscribe(
        (response) => {
          console.log('Petición creada:', response);
          this.router.navigate(['/view', response.id]); // Redirigir a la vista de la petición
        },
        (error) => {
          console.error('Error al crear la petición:', error);
        }
      );
    }
  }
}