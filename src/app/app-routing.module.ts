import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';

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
  },
  {
    path:'admin',
    component: DashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'',
        component:WelcomeComponent,
      }
    ]
  },
  {
    path:'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate:[NormalGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
