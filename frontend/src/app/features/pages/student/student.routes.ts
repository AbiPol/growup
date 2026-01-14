import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Mylearning } from './mylearning/mylearning';
import { Catalogo } from './catalogo/catalogo';


export const studentRoutes: Routes = [
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
    }
]