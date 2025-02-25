import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private router: Router
  ) {
    this.createForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      destinatario: ['', Validators.required],
      categoria_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createForm.valid) {
      this.peticionService.create(this.createForm.value).subscribe(() => {
        this.router.navigate(['/peticiones']);
      });
    }
  }
}