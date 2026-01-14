import { Routes } from '@angular/router';
import { Configuracion } from './configuracion/configuracion';

export const adminRoutes: Routes = [
    {
        path: '',
        title: 'Configuración',
        data: { icon: 'pi pi-cog' },
        component: Configuracion
    }
]