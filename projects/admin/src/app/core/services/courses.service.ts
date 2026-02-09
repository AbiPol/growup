import { Injectable, signal, computed } from '@angular/core';
import { CourseModel } from '@shared/models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    // Mock data for initial development
    private _courses = signal<CourseModel[]>([
        {
            id: 'c1',
            name: 'Master en Angular Avanzado',
            description: 'Aprende a dominar Angular 21, Signals, Zoneless y Microfrontends.',
            category: 'Programación',
            level: 'Avanzado',
            price: 99.99,
            publicationStatus: 'En Revision',
            createdAt: '2026-02-01',
            enrolledCount: 125,
            instructor: {
                id: 'i1',
                name: 'Carlos Formador',
                role: 'Senior Developer',
                avatarUrl: '',
                bio: 'Experto en arquitecturas frontend.'
            },
            syllabus: [
                {
                    title: 'Arquitectura de Señales',
                    description: 'Profundizando en Signal vs Observable.',
                    topics: [
                        { title: 'Fundamentos de WritableSignals', duration: 45 },
                        { title: 'Computed y Effects avanzado', duration: 60 },
                        { title: 'Patrones de estado compartido', duration: 90 }
                    ]
                }
            ]
        },
        {
            id: 'c2',
            name: 'Introducción a Tailwind CSS 4.0',
            description: 'El futuro del diseño CSS con variables nativas.',
            category: 'Diseño Web',
            level: 'Principiante',
            price: 49.99,
            publicationStatus: 'En Revision',
            createdAt: '2026-02-03',
            enrolledCount: 85,
            instructor: {
                id: 'i2',
                name: 'Diana Formadora',
                role: 'UI/UX Designer',
                avatarUrl: '',
                bio: 'Apasionada del diseño minimalista.'
            },
            syllabus: [
                {
                    title: 'Configuración y Variables',
                    description: 'Instalación de v4 y uso de flags.',
                    topics: [
                        { title: 'Instalación con Vite/Angular', duration: 30 },
                        { title: 'Variables nativas de CSS', duration: 45 },
                        { title: 'Nuevas utilidades de Layout', duration: 60 }
                    ]
                }
            ]
        },
        {
            id: 'c3',
            name: 'Node.js y Microservicios',
            description: 'Escalabilidad real con Node y Docker.',
            category: 'Backend',
            level: 'Intermedio',
            price: 79.99,
            publicationStatus: 'Publicado',
            createdAt: '2026-01-20',
            enrolledCount: 340,
            instructor: {
                id: 'i1',
                name: 'Carlos Formador',
                role: 'Senior Developer',
                avatarUrl: '',
                bio: 'Experto en arquitecturas frontend.'
            },
            syllabus: [
                {
                    title: 'Docker para Node',
                    description: 'Contenerización de aplicaciones.',
                    topics: [
                        { title: 'Dockerfiles eficientes', duration: 40 },
                        { title: 'Docker Compose básico', duration: 55 },
                        { title: 'Orquestación de servicios', duration: 120 }
                    ]
                }
            ]
        }
    ]);

    private _coursesSearch = signal<CourseModel[]>([]);
    // Signals
    public courses = computed(() => this._courses());
    public coursesSearch = computed(() => this._coursesSearch());

    public pendingProposals = computed(() =>
        this._courses().filter(c => c.publicationStatus === 'En Revision')
    );

    constructor() { }

    changeStatus(courseId: string, newStatus: 'Publicado' | 'Borrador' | 'En Revision', reason: string) {
        this._courses.update(courses =>
            courses.map(c => c.id === courseId ? { ...c, publicationStatus: newStatus } : c)
        );
        console.log(`Estado cambiado a ${newStatus} por: ${reason}`);
    }

    updatePrice(courseId: string, newPrice: number) {
        this._courses.update(courses =>
            courses.map(c => c.id === courseId ? { ...c, price: newPrice } : c)
        );
    }

    getCourseById(id: string) {
        return this._courses().find(c => c.id === id);
    }

    searchCourses(search: string) {
        this._coursesSearch.set(this._courses().filter(c => c.name.toLowerCase().includes(search.toLowerCase())));
    }
}
