import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'view/:id', component: ViewComponent }, // Añadir esta línea
  { path: '', component: IndexComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeticionRoutingModule { }