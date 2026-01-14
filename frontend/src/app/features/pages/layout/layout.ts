import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Button } from "primeng/button";
import { Toast } from "primeng/toast";

import { Header } from "../../../shared/header/header";
import { Sidebar } from "../../../shared/sidebar/sidebar";
import { Footer } from "../../../shared/footer/footer";
import { MessageService, SharedModule } from 'primeng/api';
import { ToastComponent } from "../../../shared/toast-component/toast-component";



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

  messageService = inject(MessageService);

  // Usamos ViewChild para acceder a la instancia real del componente en el template
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
