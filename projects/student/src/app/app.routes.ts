import { Routes } from '@angular/router';
//import { isAuthorizateGuard } from './core/guards/is-authorizate-guard';

export const routes: Routes = [
  // 1. Zona Pública (No necesaria en student si se accede vía shell)
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'student'
  // },
  // // 2. Zona Privada
  // {
  //   path: '',
  //   //canMatch: [isAuthorizateGuard],
  //   loadChildren: () => import('../../../shell/src/app/utils/student.routes').then(c => c.studentRoutes)
  // },
  // // {
  // //   path: 'teacher',
  // //   loadChildren: () => import('teacher/Routes')
  // // },
  // {
  //   path: '**',
  //   loadComponent: () => import('./features/pages/not-found/not-found').then(c => c.NotFound)
  // }
];
