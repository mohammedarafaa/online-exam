import { Routes } from '@angular/router';
import { AuthRoutes } from './core/auth/routes/auth.routes';
import { MainRoutes } from './layout/main-layout/routes/main.routes';
import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: AuthRoutes,
    canActivate: [loggedGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    children: MainRoutes,
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    title: 'Not-Found',
  },
];
