import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { NavigationService } from '../../core/services/navigation.service';
import { MenuItem } from '../../core/interfaces/general.interface';
import { Role } from '../../core/models/role.enum';

@Component({
  selector: 'growup-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterModule
  ], // Importamos lo necesario para routing
  templateUrl: './sidebar.html'
})
export class Sidebar implements OnInit {

  authService = inject(AuthService);
  navService = inject(NavigationService);
  router = inject(Router);

  menuItems: MenuItem[] = [];
  currentUserRole: Role | undefined = undefined;
  currentNameUser: string = '';
  primerCharUserName: string = 'U';

  ngOnInit(): void {
    // 1. Obtenemos el rol actual (simulado por ahora)
    this.currentUserRole = this.authService.userRole();
    this.currentNameUser = this.authService.user()?.name ?? 'INVITADO';
    this.primerCharUserName = this.currentNameUser.charAt(0).toUpperCase();
    // 2. Pedimos al servicio de navegación los items para ese rol
    this.menuItems = this.navService.getMenuItems(this.currentUserRole?.toString() || '');
    //console.log(this.menuItems);
  }

  logout() {
    console.log('Cerrando sesión...');
    this.authService.logout();
    this.router.navigate(['/auth']);
    // Aquí iría la lógica de logout real
  }
}
