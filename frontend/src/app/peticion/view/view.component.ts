import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  peticion!: Peticion;

  constructor(
    private route: ActivatedRoute,
    private peticionService: PeticionService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.peticionService.view(+id).subscribe((data: Peticion) => {
        this.peticion = data;
      });
    }
  }
}