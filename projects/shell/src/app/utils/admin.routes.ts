import { Routes } from "@angular/router";
import { AdminDashboard } from "../../../../admin/src/app/features/pages/dashboard/dashboard";
import { UsersManagement } from "../../../../admin/src/app/features/pages/users-management/users-management";
import { CourseManagement } from "../../../../admin/src/app/features/pages/course-management/course-management";
import { FinanzasPage } from "../../../../admin/src/app/features/pages/finanzas/finanzas";

export const adminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: AdminDashboard,
                title: 'Panel de Administrador',
                data: { icon: 'pi pi-chart-bar' }
            },
            {
                path: 'usuarios',
                component: UsersManagement,
                title: 'Usuarios',
                data: { icon: 'pi pi-users' }
            },
            {
                path: 'cursos',
                component: CourseManagement,
                title: 'Gestión Cursos',
                data: { icon: 'pi pi-book' }
            },
            {
                path: 'finanzas',
                component: FinanzasPage,
                title: 'Facturación',
                data: { icon: 'pi pi-wallet' }
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];