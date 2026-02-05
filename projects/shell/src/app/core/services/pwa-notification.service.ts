import { Injectable, inject } from '@angular/core';
import { SwPush } from '@angular/service-worker';

/**
 * Servicio para gestionar notificaciones push de la PWA
 * 
 * Este servicio permite:
 * 1. Solicitar permiso para enviar notificaciones
 * 2. Suscribirse a notificaciones push
 * 3. Recibir y mostrar notificaciones
 */
@Injectable({
    providedIn: 'root'
})
export class PwaNotificationService {
    private swPush = inject(SwPush);
    // ↑ SwPush es el servicio de Angular para notificaciones push

    /**
     * Solicita permiso al usuario para enviar notificaciones
     * @returns Promise<boolean> - true si se concedió el permiso
     */
    async requestPermission(): Promise<boolean> {
        // Verificamos si el navegador soporta notificaciones
        if (!('Notification' in window)) {
            // ↑ 'Notification' in window verifica si la API está disponible
            console.warn('Este navegador no soporta notificaciones');
            return false;
        }

        // Solicitamos permiso al usuario
        const permission = await Notification.requestPermission();
        // ↑ Esto muestra un popup pidiendo permiso
        //   Puede devolver: 'granted', 'denied', o 'default'

        return permission === 'granted';
    }

    /**
     * Suscribe al usuario a notificaciones push
     * NOTA: Necesitas una clave VAPID del servidor
     * 
     * @param vapidPublicKey - Clave pública VAPID de tu servidor
     */
    async subscribeToNotifications(vapidPublicKey: string): Promise<void> {
        // Verificamos si el Service Worker está habilitado
        if (!this.swPush.isEnabled) {
            console.warn('Service Worker no está habilitado');
            return;
        }

        try {
            // Solicitamos permiso primero
            const hasPermission = await this.requestPermission();

            if (!hasPermission) {
                console.log('Usuario rechazó las notificaciones');
                return;
            }

            // Nos suscribimos a las notificaciones push
            const subscription = await this.swPush.requestSubscription({
                serverPublicKey: vapidPublicKey
                // ↑ Esta clave identifica tu servidor
                //   Se genera con herramientas como web-push
            });

            // Aquí deberías enviar la suscripción a tu backend
            console.log('Suscripción exitosa:', subscription);

            // TODO: Enviar subscription a tu API
            // await this.http.post('/api/notifications/subscribe', subscription).toPromise();

        } catch (error) {
            console.error('Error al suscribirse a notificaciones:', error);
        }
    }

    /**
     * Escucha las notificaciones push entrantes
     */
    listenToNotifications(): void {
        if (!this.swPush.isEnabled) {
            return;
        }

        // Escuchamos mensajes push
        this.swPush.messages.subscribe(message => {
            // ↑ Este observable emite cuando llega una notificación
            console.log('Notificación recibida:', message);

            // Aquí puedes procesar el mensaje
            // Por ejemplo, mostrar un toast, actualizar datos, etc.
        });

        // Escuchamos clics en las notificaciones
        this.swPush.notificationClicks.subscribe(click => {
            // ↑ Se emite cuando el usuario hace clic en una notificación
            console.log('Click en notificación:', click);

            // Puedes navegar a una ruta específica
            // this.router.navigate([click.action]);
        });
    }

    /**
     * Cancela la suscripción a notificaciones
     */
    async unsubscribe(): Promise<void> {
        if (!this.swPush.isEnabled) {
            return;
        }

        try {
            await this.swPush.unsubscribe();
            console.log('Suscripción cancelada');

            // TODO: Notificar a tu backend que se canceló la suscripción

        } catch (error) {
            console.error('Error al cancelar suscripción:', error);
        }
    }
}
