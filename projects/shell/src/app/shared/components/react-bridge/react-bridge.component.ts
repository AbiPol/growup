import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { mount } from '@teacher/bootstrap';
// Forzar a Vite a incluir estas dependencias en el bundle de Angular
import 'react';
import 'react-dom';
import 'react-router-dom';
// import 'primereact/api'; // ← Comentado: causa errores con fuentes .woff2 en build de producción

@Component({
    selector: 'growup-react-bridge',
    standalone: true,
    template: '<div #reactContainer class="react-container"></div>',
    styles: [`
    .react-container {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ReactBridgeComponent implements OnInit, OnDestroy {
    @ViewChild('reactContainer', { static: true }) container!: ElementRef;
    private unmountFn?: () => void;
    private router = inject(Router);
    private sub?: Subscription;

    ngOnInit(): void {
        if (this.container) {
            this.unmountFn = mount(this.container.nativeElement);

            // Forzamos una sincronización inmediata después del montaje
            // para que React Router detecte la URL actual en el primer renderizado
            // tras un redirect de Angular.
            setTimeout(() => {
                window.dispatchEvent(new PopStateEvent('popstate'));
            }, 0);
        }

        // Sincronización de rutas: Cuando Angular navega, forzamos a React a enterarse
        this.sub = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            // Disparamos un evento popstate manual para que React Router se despierte
            window.dispatchEvent(new PopStateEvent('popstate'));
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
        if (this.unmountFn) {
            this.unmountFn();
        }
    }
}
