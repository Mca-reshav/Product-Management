import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ListComponent } from './product/list/list.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login', animation: 'LoginPage' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register', animation: 'RegisterPage' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { title: 'Profile', animation: 'ProfilePage' } },
  { path: 'product/list', component: ListComponent, canActivate: [AuthGuard], data: { title: 'List', animation: 'ListPage' } },
  { path: '**', redirectTo: 'login' }
];
