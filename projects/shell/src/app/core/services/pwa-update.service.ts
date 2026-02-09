import { Injectable, inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

/**
 * Servicio para gestionar las actualizaciones de la PWA
 * 
 * Este servicio se encarga de:
 * 1. Detectar cuando hay una nueva versión de la aplicación disponible
 * 2. Notificar al usuario
 * 3. Aplicar la actualización cuando el usuario lo apruebe
 */
@Injectable({
    providedIn: 'root'
    // ↑ 'root' significa que este servicio es un singleton
    //   Se crea una sola instancia para toda la aplicación
})
export class PwaUpdateService {
    // Inyectamos el servicio SwUpdate de Angular
    private swUpdate = inject(SwUpdate);
    // ↑ inject() es la forma moderna de inyectar dependencias en Angular
    //   Equivalente a usar el constructor con private swUpdate: SwUpdate

    constructor() {
        // Verificamos si el Service Worker está habilitado
        if (this.swUpdate.isEnabled) {
            // ↑ isEnabled es false en desarrollo, true en producción
            this.checkForUpdates();
        }
    }

    /**
     * Verifica si hay actualizaciones disponibles
     * y notifica al usuario cuando las encuentra
     */
    private checkForUpdates(): void {
        // Escuchamos los eventos de versión del Service Worker
        this.swUpdate.versionUpdates
            .pipe(
                // ↑ pipe() nos permite encadenar operadores RxJS

                filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
                // ↑ filter() solo deja pasar eventos de tipo 'VERSION_READY'
                //   Esto significa que hay una nueva versión lista para activarse
                //   evt is VersionReadyEvent es un type guard de TypeScript
            )
            .subscribe(() => {
                // ↑ subscribe() ejecuta este código cuando llega un evento

                // Mostramos un mensaje al usuario preguntando si quiere actualizar
                const updateConfirmed = confirm(
                    '¡Nueva versión disponible! ¿Deseas actualizar la aplicación ahora?'
                );

                if (updateConfirmed) {
                    // Si el usuario acepta, recargamos la página
                    this.applyUpdate();
                }
            });

        // Verificamos actualizaciones cada 6 horas
        this.scheduleUpdateChecks();
    }

    /**
     * Aplica la actualización recargando la página
     */
    private applyUpdate(): void {
        // Recargamos la página para activar la nueva versión
        window.location.reload();
        // ↑ Esto cierra el Service Worker antiguo y activa el nuevo
    }

    /**
     * Programa verificaciones periódicas de actualizaciones
     */
    private scheduleUpdateChecks(): void {
        // Verificamos actualizaciones cada 6 horas (21600000 ms)
        setInterval(() => {
            // ↑ setInterval ejecuta una función cada X milisegundos

            this.swUpdate.checkForUpdate()
                // ↑ Verifica manualmente si hay actualizaciones
                .then(() => {
                    console.log('Verificación de actualización completada');
                })
                .catch(err => {
                    console.error('Error al verificar actualizaciones:', err);
                });
        }, 6 * 60 * 60 * 1000); // 6 horas en milisegundos
    }

    /**
     * Método público para forzar una verificación de actualización
     * Útil para llamar desde un botón en la UI
     */
    public checkNow(): void {
        this.swUpdate.checkForUpdate()
            .then(updateFound => {
                if (updateFound) {
                    console.log('Actualización encontrada');
                } else {
                    console.log('La aplicación está actualizada');
                }
            })
            .catch(err => {
                console.error('Error al verificar actualizaciones:', err);
            });
    }
}
