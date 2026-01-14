import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { roleRedirectGuard } from '../../core/guards/role-redirect.guard';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                pathMatch: 'full',
                canActivate: [roleRedirectGuard],
                children: []
            },
            {
                path: 'student',
                loadChildren: () => import('./student/student.routes').then(c => c.studentRoutes)
            },
            {
                path: 'formador',
                loadChildren: () => import('./formador/formador.routes').then(c => c.formadorRoutes)
            },
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.routes').then(c => c.adminRoutes)
            }
        ]
    }
]