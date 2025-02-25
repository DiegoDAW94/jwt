import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  peticionId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peticionService: PeticionService
  ) { }

  ngOnInit(): void {
    this.peticionId = +this.route.snapshot.paramMap.get('id')!;
    this.peticionService.view(this.peticionId).subscribe((data: Peticion) => {
      this.form = new FormGroup({
        titulo: new FormControl(data.titulo, Validators.required),
        descripcion: new FormControl(data.descripcion, Validators.required),
        destinatario: new FormControl(data.destinatario, Validators.required),
        categoria_id: new FormControl(data.categoria_id, Validators.required),
      });
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.peticionService.edit(this.peticionId, this.form.value).subscribe((res: any) => {
        console.log('Peticion updated successfully!');
        this.router.navigateByUrl('peticion/index');
      });
    }
  }
}