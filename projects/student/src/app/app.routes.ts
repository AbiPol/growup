import { Routes } from '@angular/router';
import { CourseDetail } from './shared/components/course-detail/course-detail';
import { Catalogo } from './features/pages/catalogo/catalogo';
import { Dashboard } from './features/pages/dashboard/dashboard';
import { Mylearning } from './features/pages/mylearning/mylearning';

export const studentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        data: { icon: 'pi pi-home' },
        component: Dashboard
      },
      {
        path: 'mylearning',
        title: 'Mi aprendizaje',
        data: { icon: 'pi pi-book' },
        component: Mylearning
      },
      {
        path: 'catalogo',
        title: 'Catálogo',
        data: { icon: 'pi pi-list' },
        component: Catalogo
      },
      {
        path: 'courses/:id',
        title: '',
        data: {},
        component: CourseDetail
      }
    ]
  }
];

// Alias para compatibilidad interna: algunas partes del código esperan `routes`.
export const routes = studentRoutes;
