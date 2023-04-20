import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path:'signUp',
    component: SignUpComponent,
    pathMatch: 'full',
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full',
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
