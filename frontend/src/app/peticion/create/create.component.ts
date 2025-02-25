import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public peticionService: PeticionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      destinatario: new FormControl('', Validators.required),
      categoria_id: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.peticionService.create(this.form.value).subscribe((res: any) => {
        console.log('Peticion created successfully!');
        this.router.navigateByUrl('peticion/index');
      });
    }
  }
}