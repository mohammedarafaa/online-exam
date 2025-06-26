import { Routes } from '@angular/router';
export const AuthRoutes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../components/login/login.component').then(
        (c) => c.LoginComponent
      ),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    title: 'Register',
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('../components/forget-password/forget-password.component').then(
        (c) => c.ForgetpasswordComponent
      ),
    title: 'Forget-Password',
  },
];
