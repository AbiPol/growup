import { Routes } from '@angular/router';
import { PanelGestion } from './panel-gestion/panel-gestion';
import { GestionCursos } from './gestion-cursos/gestion-cursos';
import { Analiticas } from './analiticas/analiticas';

export const formadorRoutes: Routes = [
    {
        path: '',
        title: 'Panel de gestión',
        data: { icon: 'pi pi-briefcase' },
        component: PanelGestion
    },
    {
        path: 'cursos',
        title: 'Gestión de cursos',
        data: { icon: 'pi pi-folder' },
        component: GestionCursos
    },
    {
        path: 'analitycs',
        title: 'Estadisticas de alumnos',
        data: { icon: 'pi pi-users' },
        component: Analiticas
    }
]