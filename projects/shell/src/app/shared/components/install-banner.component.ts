import { Component, inject, computed } from '@angular/core';
import { PwaInstallService } from '../../core/services/pwa-install.service';

/**
 * Componente de banner para promover la instalación de la PWA
 * 
 * Este componente:
 * 1. Se muestra solo si la app NO está instalada
 * 2. Permite al usuario instalar la app con un clic
 * 3. Se puede cerrar si el usuario no quiere instalar ahora
 */
@Component({
  selector: 'growup-install-banner',
  standalone: true,
  // ↑ standalone: true significa que este componente no necesita un módulo
  //   Es la forma moderna de crear componentes en Angular

  template: `
    <!-- Solo mostramos el banner si la app NO está instalada Y el prompt está disponible -->
    @if (showBanner()) {
      <div class="install-banner">
      <!-- ↑ @if es el nuevo control flow de Angular 21 (zoneless compatible) -->
      
      <div class="banner-content">
        <img 
          src="assets/icons/web-app-manifest-192x192.png" 
          alt="GrowUp"
          class="banner-icon">
        
        <div class="banner-text">
          <h3>Instala GrowUp</h3>
          <p>Accede más rápido y úsala sin conexión</p>
        </div>
      </div>
      
      <div class="banner-actions">
        <button 
          (click)="install()"
          class="btn-install">
          <!-- ↑ (click) es event binding - ejecuta install() cuando se hace clic -->
          Instalar
        </button>
        
        <button 
          (click)="dismiss()"
          class="btn-dismiss">
          Ahora no
        </button>
      </div>
      </div>
    }
  `,

  styles: [`
    .install-banner {
      /* Posicionamiento fijo en la parte inferior */
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      
      /* Gradiente con los colores de GrowUp */
      background: linear-gradient(135deg, #FF7A00 0%, #FF9F40 100%);
      
      color: white;
      padding: 1rem;
      
      /* Sombra para dar profundidad */
      box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
      
      /* z-index alto para que esté sobre todo */
      z-index: 1000;
      
      /* Flexbox para layout horizontal */
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      
      /* Animación de entrada */
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(100%);
        /* ↑ Empieza fuera de la pantalla (abajo) */
      }
      to {
        transform: translateY(0);
        /* ↑ Termina en su posición normal */
      }
    }

    .banner-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .banner-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      /* ↑ Esquinas redondeadas para el icono */
    }

    .banner-text h3 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .banner-text p {
      margin: 0.25rem 0 0;
      font-size: 0.9rem;
      opacity: 0.9;
      /* ↑ Ligeramente transparente para jerarquía visual */
    }

    .banner-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-install,
    .btn-dismiss {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      
      /* Transición suave para hover */
      transition: all 0.2s;
    }

    .btn-install {
      background: white;
      color: #FF7A00;
    }

    .btn-install:hover {
      /* Efecto de escala al pasar el mouse */
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .btn-dismiss {
      background: transparent;
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }

    .btn-dismiss:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Responsive para móviles */
    @media (max-width: 640px) {
      .install-banner {
        flex-direction: column;
        /* ↑ En móviles, apilamos verticalmente */
        text-align: center;
      }

      .banner-content {
        flex-direction: column;
      }

      .banner-actions {
        width: 100%;
      }

      .btn-install,
      .btn-dismiss {
        flex: 1;
        /* ↑ Los botones ocupan el mismo espacio */
      }
    }
  `]
})
export class InstallBannerComponent {
  // Inyectamos el servicio de instalación
  private installService = inject(PwaInstallService);

  // Computed signal para determinar si mostrar el banner
  protected showBanner = computed(() => {
    // ↑ computed() crea un signal derivado que se recalcula automáticamente
    //   cuando cambian los signals de los que depende

    // Verificamos si el usuario ya rechazó el banner antes
    const dismissed = localStorage.getItem('install-banner-dismissed') === 'true';

    // Solo mostramos si:
    // 1. NO está instalada
    // 2. El prompt está disponible
    // 3. El usuario NO ha rechazado el banner
    return !this.installService.isInstalled() &&
      this.installService.canInstall() &&
      !dismissed;
    // ↑ Los signals se leen como funciones: signal()
    //   Angular detecta automáticamente las dependencias
  });

  /**
   * Maneja el clic en el botón de instalar
   */
  async install(): Promise<void> {
    // Mostramos el prompt de instalación
    const installed = await this.installService.showInstallPrompt();
    // ↑ await espera a que el usuario responda al prompt

    if (installed) {
      console.log('¡App instalada exitosamente!');
      // No necesitamos actualizar showBanner manualmente
      // El computed signal se actualiza automáticamente
    }
  }

  /**
   * Maneja el clic en el botón de cerrar
   */
  dismiss(): void {
    // Guardamos en localStorage que el usuario rechazó
    localStorage.setItem('install-banner-dismissed', 'true');
    // ↑ Esto evita que el banner se muestre de nuevo

    // El computed signal detectará el cambio en localStorage
    // y ocultará el banner automáticamente

    console.log('Banner de instalación cerrado');
  }
}
