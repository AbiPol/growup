import { inject, Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/general.interface';
import { AuthService } from './auth-service';
//import { studentRoutes } from '../../../../../features/pages/student/student.routes';
import { studentRoutes } from '../../utils/student.routes';
import { routes } from '../../app.routes';
//import { formadorRoutes } from '../../features/pages/formador/formador.routes';
//import { adminRoutes } from '../../features/pages/admin/admin.routes';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    authService = inject(AuthService);
    role = this.authService.userRole();

    //routes: any = studentRoutes.filter(route => console.log(studentRoutes[0].children));
    studentMenu: MenuItem[] = studentRoutes[0].children
        .filter(items => items.path !== '**')
        .filter(items => items.path !== '')
        .filter(items => items.title !== '')
        .map(route => ({
            label: route.title as string,
            icon: route.data?.['icon'] as string,
            route: `/private/student/${route.path || ''}`.replace(/\/$/, ''), // Construye la ruta absoluta
            roles: ['STUDENT']
        }));

    // formadorMenu: MenuItem[] = formadorRoutes
    //     .filter(items => items.path !== '**')
    //     .filter(items => items.path !== '')
    //     .filter(items => items.title !== '')
    //     .map(route => ({
    //         label: route.title as string,
    //         icon: route.data?.['icon'] as string,
    //         route: `/private/formador/${route.path || ''}`.replace(/\/$/, ''), // Construye la ruta absoluta
    //         roles: ['TEACHER']
    //     }));

    // adminMenu: MenuItem[] = adminRoutes
    //     .filter(items => items.path !== '**')
    //     .filter(items => items.path !== '')
    //     .filter(items => items.title !== '')
    //     .map(route => ({
    //         label: route.title as string,
    //         icon: route.data?.['icon'] as string,
    //         route: `/private/admin/${route.path || ''}`.replace(/\/$/, ''),
    //         roles: ['ADMIN']
    //     }));
    // Definimos todos los items posibles de la aplicación

    // private allMenuItems: MenuItem[] = [
    //     ...this.studentMenu, ...this.formadorMenu, ...this.adminMenu
    // ]
    private allMenuItems: MenuItem[] = [
        ...this.studentMenu
    ]

    constructor() {
        //console.log(this.studentMenu);
    }

    getMenuItems(role: string): MenuItem[] {

        const menuItem = this.allMenuItems.filter(item =>
            !item.roles || item.roles.includes(role)
        );
        return menuItem;
    }
}
