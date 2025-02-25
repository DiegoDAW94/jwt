import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  peticionId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private peticionService: PeticionService
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      destinatario: ['', Validators.required],
      categoria_id: ['', Validators.required]
    });
    this.peticionId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.peticionService.view(this.peticionId).subscribe((data: Peticion) => {
      this.form.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.peticionService.edit(this.peticionId, this.form.value).subscribe(() => {
        this.router.navigate(['/peticiones']);
      });
    }
  }
}