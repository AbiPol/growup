export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    date: Date;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
    link?: string; // Opcional: Enlace a un curso o recurso relacionado
}
