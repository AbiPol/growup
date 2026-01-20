import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StudentStats } from '../models/student-stats.model';
import { Notification } from '../models/notification.model';
import { EnrolledCourse } from '../models/enrollment.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private stats: StudentStats = {
        activeCoursesCount: 3,
        completedCoursesCount: 12,
        certificatesEarned: 5,
        totalHoursLearning: 120,
        averageScore: 92,
        learningStreakDays: 5
    };

    private notifications: Notification[] = [
        {
            id: '1',
            userId: 'current-user',
            title: 'Nueva tarea asignada',
            message: 'Tienes una nueva tarea en "Introducción a Angular".',
            date: new Date(),
            read: false,
            type: 'info'
        },
        {
            id: '2',
            userId: 'current-user',
            title: 'Certificado disponible',
            message: 'Felicidades, has completado "CSS Avanzado".',
            date: new Date(new Date().setDate(new Date().getDate() - 1)),
            read: true,
            type: 'success'
        },
        {
            id: '3',
            userId: 'current-user',
            title: 'Recordatorio de curso',
            message: 'No olvides continuar tu progreso en "Gestión del Tiempo".',
            date: new Date(new Date().setDate(new Date().getDate() - 3)),
            read: false,
            type: 'warning'
        },
        {
            id: '4',
            userId: 'current-user',
            title: 'Recordatorio',
            message: '¡Atención! Has perdido tu progreso en "Gestión del Tiempo".',
            date: new Date(new Date().setDate(new Date().getDate() - 3)),
            read: true,
            type: 'error'
        }
    ];

    private enrolledCoursesSignal: WritableSignal<EnrolledCourse[]> = signal<EnrolledCourse[]>([
        {
            id: '101',
            name: 'Angular Avanzado: Patrones y Rendimiento',
            description: 'Domina las técnicas avanzadas de Angular para aplicaciones escalables.',
            imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
            category: 'Desarrollo Web',
            level: 'Avanzado',
            duration: 20,
            price: 0,
            startDate: new Date(),
            endDate: new Date(),
            status: 'active',
            progress: 75,
            lastAccessDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            instructor: {
                id: 'inst-1',
                name: 'Carlos Desarrollador',
                role: 'Senior Frontend Engineer',
                avatarUrl: 'https://primefaces.org/cdn/primeng/images/usercard.png',
                bio: 'Experto en Angular y Web Performance'
            }
        },
        {
            id: '102',
            name: 'UX/UI Design Fundamentals',
            description: 'Aprende los principios básicos del diseño de interfaces.',
            imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
            category: 'Diseño',
            level: 'Principiante',
            duration: 15,
            price: 0,
            startDate: new Date(),
            endDate: new Date(),
            status: 'active',
            progress: 30,
            lastAccessDate: new Date(new Date().setDate(new Date().getDate() - 2)),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            instructor: {
                id: 'inst-2',
                name: 'Ana Diseñadora',
                role: 'Product Designer',
                avatarUrl: 'https://primefaces.org/cdn/primeng/images/usercard.png',
                bio: 'Apasionada por el diseño de experiencias'
            }
        },
        {
            id: '103',
            name: 'Gestión de Proyectos Ágiles',
            description: 'Metodologías Scrum y Kanban aplicadas.',
            imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
            category: 'Negocios',
            level: 'Intermedio',
            duration: 10,
            price: 0,
            startDate: new Date(),
            endDate: new Date(),
            status: 'completed',
            progress: 100,
            lastAccessDate: new Date(new Date().setDate(new Date().getDate() - 5)),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            instructor: {
                id: 'inst-3',
                name: 'Pedro Manager',
                role: 'Agile Coach',
                avatarUrl: 'https://primefaces.org/cdn/primeng/images/usercard.png',
                bio: 'Facilitador de equipos de alto rendimiento'
            }
        },
        {
            id: '104',
            name: 'Introducción a Python',
            description: 'Primeros pasos en el mundo del desarrollo con Python.',
            imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
            category: 'Programación',
            level: 'Principiante',
            duration: 12,
            price: 0,
            startDate: new Date(),
            endDate: new Date(),
            status: 'not_started',
            progress: 0,
            lastAccessDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            instructor: {
                id: 'inst-1',
                name: 'Carlos Desarrollador',
                role: 'Senior Frontend Engineer',
                avatarUrl: 'https://primefaces.org/cdn/primeng/images/usercard.png',
                bio: 'Facilitador de equipos de alto rendimiento'
            }
        },
        {
            id: '105',
            name: 'Bases de Datos SQL',
            description: 'Aprende a gestionar datos de forma eficiente.',
            imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
            category: 'Backend',
            level: 'Intermedio',
            duration: 18,
            price: 0,
            startDate: new Date(),
            endDate: new Date(),
            status: 'archived',
            progress: 10,
            lastAccessDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            instructor: {
                id: 'inst-4',
                name: 'Laura Datos',
                role: 'Database Administrator',
                avatarUrl: 'https://primefaces.org/cdn/primeng/images/usercard.png',
                bio: 'Facilitador de equipos de alto rendimiento'
            }
        }
    ]);

    constructor() { }

    getStudentStats(): Observable<StudentStats> {
        return of(this.stats);
    }

    getNotifications(): Observable<Notification[]> {
        return of(this.notifications);
    }

    getEnrolledCourses() {
        return this.enrolledCoursesSignal.asReadonly();
    }

    addEnrolledCourse(course: EnrolledCourse): void {
        this.enrolledCoursesSignal.update(courses => [...courses, course]);
    }
}
