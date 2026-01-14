import { Routes } from '@angular/router';
import { isAuthorizateGuard } from './core/guards/is-authorizate-guard';
import { isAuthenticatedGuard } from './core/guards/is-authenticated-guard';

export const routes: Routes = [
  // 1. Zona Pública
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(c => c.LandingComponent)
  },
  {
    path: 'auth',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(c => c.authRoutes)
  },
  // 2. Zona Privada
  {
    path: 'private',
    canMatch: [isAuthorizateGuard],
    loadChildren: () => import('./features/pages/pages.routes').then(c => c.routes)
  },
  {
    path: '**',
    loadComponent: () => import('./features/pages/not-found/not-found').then(c => c.NotFound)
  }
];
