import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NavigationComponent } from './layouts/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { SignedComponent } from './peticion/signed/signed.component';
import { ViewComponent } from './peticion/view/view.component';
import { MineComponent } from './peticion/mine/mine.component';
import { AdminPanelComponent } from './peticion/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: SigninComponent },
      { path: 'register', component: SignupComponent },
      { path: 'profile', component: UserProfileComponent },
      {
        path: 'peticiones',
        loadChildren: () => import('./peticion/peticion-routing.module').then(m => m.PeticionRoutingModule)
      },
      { path: 'misfirmas', component: SignedComponent },
      { path: 'mispeticiones', component: MineComponent }, // Ruta para "Mis Peticiones"
      { path: 'view/:id', component: ViewComponent },
      { path: 'admin', component: AdminPanelComponent },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}