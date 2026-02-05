import { Injectable, signal, computed } from '@angular/core';

/**
 * Servicio para gestionar la instalación de la PWA
 * 
 * Este servicio permite:
 * 1. Detectar si la app está instalada
 * 2. Mostrar el prompt de instalación
 * 3. Saber cuándo el prompt está disponible
 * 
 * Usa signals de Angular 21 para reactividad sin Zone.js
 */
@Injectable({
    providedIn: 'root'
    // ↑ Singleton - una sola instancia en toda la app
})
export class PwaInstallService {
    // Signal para mantener el estado de instalación
    private _isInstalled = signal<boolean>(false);
    // ↑ signal() crea un valor reactivo que:
    //   - Notifica automáticamente cuando cambia
    //   - Es más eficiente que RxJS en Angular 21
    //   - Compatible con zoneless

    // Signal para saber si el prompt está disponible
    private _canInstall = signal<boolean>(false);
    // ↑ Usamos un signal separado para el estado del prompt

    // Guardamos el evento de instalación para usarlo después
    private deferredPrompt: any = null;
    // ↑ Este evento se dispara cuando el navegador detecta que la app es instalable

    // Signals públicos de solo lectura
    readonly isInstalled = this._isInstalled.asReadonly();
    // ↑ asReadonly() crea un signal de solo lectura
    //   Los componentes pueden leerlo pero no modificarlo

    readonly canInstall = this._canInstall.asReadonly();
    // ↑ Signal de solo lectura para saber si podemos instalar

    constructor() {
        // Al crear el servicio, verificamos el estado
        this.checkIfInstalled();
        this.listenForInstallPrompt();
    }

    /**
     * Verifica si la app ya está instalada
     */
    private checkIfInstalled(): void {
        // Verificamos si la app se está ejecutando en modo standalone
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        // ↑ window.matchMedia() verifica si se cumple una media query CSS
        //   'display-mode: standalone' es true cuando:
        //   - La app fue instalada y se abrió desde el icono
        //   - No se está ejecutando dentro del navegador

        // También verificamos en iOS (Safari usa una propiedad diferente)
        const isIOS = (navigator as any).standalone === true;
        // ↑ En iOS, navigator.standalone es true si está instalada

        // Actualizamos el signal
        this._isInstalled.set(isStandalone || isIOS);
        // ↑ .set() actualiza el valor del signal
        //   Todos los componentes que lo usan se actualizan automáticamente
    }

    /**
     * Escucha el evento beforeinstallprompt
     * Este evento se dispara cuando el navegador detecta que la app es instalable
     */
    private listenForInstallPrompt(): void {
        window.addEventListener('beforeinstallprompt', (e) => {
            // ↑ Este evento se dispara automáticamente cuando:
            //   1. La app cumple todos los criterios de PWA:
            //      - Tiene manifest.webmanifest
            //      - Tiene Service Worker registrado
            //      - Se sirve por HTTPS (o localhost)
            //   2. El usuario aún no ha instalado la app
            //   3. El usuario no ha rechazado la instalación recientemente

            // Prevenimos que el navegador muestre su propio prompt automáticamente
            e.preventDefault();
            // ↑ Esto nos da control sobre CUÁNDO mostrar el prompt

            // Guardamos el evento para usarlo después
            this.deferredPrompt = e;

            // Actualizamos el signal
            this._canInstall.set(true);
            // ↑ Ahora los componentes saben que pueden mostrar el botón de instalación

            console.log('Prompt de instalación disponible');
        });

        // Escuchamos cuando la app se instala
        window.addEventListener('appinstalled', () => {
            // ↑ Se dispara cuando el usuario completa la instalación
            console.log('PWA instalada exitosamente');
            this._isInstalled.set(true);
            this._canInstall.set(false);
            this.deferredPrompt = null;
        });
    }

    /**
     * Muestra el prompt de instalación al usuario
     * @returns Promise<boolean> - true si el usuario aceptó instalar
     */
    async showInstallPrompt(): Promise<boolean> {
        // Verificamos si tenemos un prompt disponible
        if (!this.deferredPrompt) {
            console.log('No hay prompt de instalación disponible');
            // Esto puede pasar si:
            // - La app ya está instalada
            // - El usuario rechazó la instalación recientemente
            // - No se cumplen los criterios de PWA
            return false;
        }

        // Mostramos el prompt nativo del navegador
        this.deferredPrompt.prompt();
        // ↑ Esto muestra el diálogo de instalación del navegador
        //   El usuario verá algo como:
        //   "¿Instalar GrowUp?"
        //   [Instalar] [Cancelar]

        // Esperamos la respuesta del usuario
        const { outcome } = await this.deferredPrompt.userChoice;
        // ↑ userChoice es una Promise que se resuelve cuando el usuario decide
        //   outcome puede ser:
        //   - 'accepted': El usuario aceptó instalar
        //   - 'dismissed': El usuario canceló

        console.log(`Usuario ${outcome === 'accepted' ? 'aceptó' : 'rechazó'} la instalación`);

        // Limpiamos el prompt (ya no se puede usar de nuevo)
        this.deferredPrompt = null;
        this._canInstall.set(false);

        // Si el usuario aceptó, actualizamos el estado
        if (outcome === 'accepted') {
            this._isInstalled.set(true);
            return true;
        }

        return false;
    }
}
