import { Component, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PwaUpdateService } from './core/services/pwa-update.service';
import { InstallBannerComponent } from './shared/components/install-banner.component';
// ↑ Importamos el componente de banner de instalación


@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    InstallBannerComponent,
    // ↑ Añadimos el componente standalone a los imports
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('growup-frontend');

  // Inyectamos el servicio de actualización PWA
  private pwaUpdate = inject(PwaUpdateService);
  // ↑ Al inyectarlo aquí, el servicio se inicializa automáticamente
  //   y comienza a escuchar actualizaciones en segundo plano
  //   No necesitamos hacer nada más, el servicio trabaja solo



}
