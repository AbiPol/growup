import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { Button } from "primeng/button";
import { Toast } from "primeng/toast";

import { Header } from "../../shared/header/header";
import { Sidebar } from "../../shared/sidebar/sidebar";
import { Footer } from "../../shared/footer/footer";
import { MessageService, SharedModule } from 'primeng/api';
import { ToastComponent } from "../../shared/toast-component/toast-component";
import { AuthService } from '../../core/services/auth-service';
import { NavigationService } from '../../core/services/navigation.service';
import { filter, map, startWith } from 'rxjs';



@Component({
  selector: 'growup-layout',
  imports: [
    RouterOutlet,
    Header,
    Sidebar,
    Footer,
    ToastComponent,
    SharedModule
  ],
  providers: [],
  templateUrl: './layout.html'
})
export class Layout {

  isMobileMenuOpen = false;

  // Usamos ViewChild para acceder a la instancia real del componente en el template
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  messageService = inject(MessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  //layout = inject(LayoutService);
  private navigationService = inject(NavigationService);



  section$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    startWith(null),
    map(() => {
      let r = this.route.firstChild;
      while (r?.firstChild) r = r.firstChild;
      return (r?.snapshot.data?.['section'] as string | undefined) ?? 'app';
    })
  );

  // Menú calculado por rol + sección
  menu$ = this.navigationService.getMenuItems(this.auth.userRole());




  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
