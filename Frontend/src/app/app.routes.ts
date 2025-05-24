import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./admin/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
];
