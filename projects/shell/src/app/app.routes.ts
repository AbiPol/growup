import { Routes } from '@angular/router';
import { isAuthorizateGuard } from './core/guards/is-authorizate-guard';
import { isAuthenticatedGuard } from './core/guards/is-authenticated-guard';
import { roleRedirectGuard } from './core/guards/role-redirect.guard';
import { Catalogo } from '../../../student/src/app/features/pages/catalogo/catalogo';
import { Dashboard } from '../../../student/src/app/features/pages/dashboard/dashboard';
import { Mylearning } from '../../../student/src/app/features/pages/mylearning/mylearning';
import { CourseDetail } from '../../../student/src/app/shared/components/course-detail/course-detail';
import { LandingComponent } from './features/landing/landing.component';
import { Layout } from './features/layout/layout';
import { NotFound } from './features/not-found/not-found';


export const routes: Routes = [
  // 1. Zona Pública
  {
    path: '',
    component: LandingComponent,
    //loadComponent: () => import('./features/landing/landing.component').then(c => c.LandingComponent),
    pathMatch: 'full',
    data: { section: 'landing' }
  },
  {
    path: 'private',
    component: Layout,
    //loadComponent: () => import('./features/layout/layout').then(c => c.Layout),
    canActivate: [isAuthorizateGuard],
    canActivateChild: [roleRedirectGuard],
    children: [
      {
        // 2. Zona Privada   
        path: '',
        pathMatch: 'full',
        canActivate: [roleRedirectGuard],
        children: []
      },
      {
        path: 'student',
        loadChildren: () => import('./utils/student.routes').then(c => c.studentRoutes)
      },
    ]
  },

  {
    path: 'auth',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(c => c.authRoutes)
  },
  {
    path: '**',
    component: NotFound
  }
];
