import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PeticionRoutingModule } from './peticion-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { SignedComponent } from './signed/signed.component';
import { MineComponent } from './mine/mine.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent,
    EditComponent,
    IndexComponent,
    SignedComponent,
    MineComponent,
    AdminPanelComponent,
  ],
  imports: [
    CommonModule,
    PeticionRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    MineComponent // Exporta si necesitas usarlo fuera de este módulo
  ]
})
export class PeticionModule { }