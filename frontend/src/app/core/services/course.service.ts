import { Injectable } from '@angular/core';
import { CourseModel } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: CourseModel[] = [
    {
      id: '1',
      name: 'Introducción a Angular',
      description: 'Aprende los fundamentos de Angular 19, componentes, servicios y directivas.',
      imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
      category: 'Desarrollo Web',
      level: 'Principiante',
      price: 0,
      duration: 20,
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-02-28'),
      status: 'Publicado',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      instructor: {
        id: 'inst-1',
        name: 'Roberto Gómez',
        role: 'Senior Software Engineer',
        avatarUrl: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        bio: 'Experto en desarrollo web con más de 10 años de experiencia liderando equipos ágiles.'
      },
      syllabus: [
        {
          title: 'Módulo 1: Fundamentos',
          description: 'Introducción a los conceptos clave y configuración del entorno.',
          topics: [
            { title: 'Bienvenida e Introducción', duration: 10 },
            { title: 'Instalación de herramientas', duration: 25 },
            { title: 'Primeros pasos', duration: 45 }
          ]
        },
        {
          title: 'Módulo 2: Conceptos Avanzados',
          description: 'Profundizando en la arquitectura y patrones de diseño.',
          topics: [
            { title: 'Arquitectura de componentes', duration: 60 },
            { title: 'Gestión de estado', duration: 55 }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Diseño UX/UI Avanzado',
      description: 'Domina Figma y los principios de diseño centrado en el usuario.',
      imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      category: 'Diseño',
      level: 'Avanzado',
      price: 49.99,
      duration: 40,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-04-15'),
      status: 'Publicado',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      instructor: {
        id: 'inst-2',
        name: 'Laura Martínez',
        role: 'Lead Product Designer',
        avatarUrl: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png',
        bio: 'Diseñadora apasionada por crear experiencias de usuario intuitivas y accesibles.'
      },
      syllabus: [
        {
          title: 'Introducción a Figma',
          description: 'Conociendo la interfaz y herramientas básicas.',
          topics: [
            { title: 'Interfaz de usuario', duration: 30 },
            { title: 'Vectores y formas', duration: 45 }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Gestión de Proyectos Ágiles',
      description: 'Scrum, Kanban y metodologías ágiles para equipos modernos.',
      imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
      category: 'Negocios',
      level: 'Intermedio',
      price: 29.99,
      duration: 15,
      startDate: new Date('2026-02-15'),
      endDate: new Date('2026-03-01'),
      status: 'Borrador',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      instructor: {
        id: 'inst-3',
        name: 'Carlos Ruiz',
        role: 'Agile Coach',
        avatarUrl: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
        bio: 'Facilitador de procesos ágiles y transformación digital en grandes empresas.'
      },
      syllabus: [
        {
          title: 'Fundamentos de Scrum',
          description: 'Roles, eventos y artefactos.',
          topics: [{ title: 'El equipo Scrum', duration: 20 }]
        }
      ]
    },
    {
      id: '4',
      name: 'Java Spring Boot Microservicios',
      description: 'Arquitectura de microservicios robusta con Spring Boot 3.',
      imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
      category: 'Backend',
      level: 'Avanzado',
      price: 89.99,
      duration: 60,
      startDate: new Date('2026-04-01'),
      endDate: new Date('2026-06-01'),
      status: 'Publicado',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      instructor: {
        id: 'inst-1',
        name: 'Roberto Gómez',
        role: 'Senior Software Engineer',
        avatarUrl: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        bio: 'Experto en desarrollo web y arquitecturas distribuidas.'
      },
      syllabus: [
        {
          title: 'Microservicios con Spring',
          description: 'Creación y despliegue de servicios.',
          topics: [{ title: 'Configuración inicial', duration: 50 }]
        }
      ]
    },
    {
      id: '5',
      name: 'Marketing Digital 101',
      description: 'Estrategias de SEO, SEM y redes sociales para emprendedores.',
      imageUrl: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
      category: 'Marketing',
      level: 'Principiante',
      price: 19.99,
      duration: 10,
      startDate: new Date('2026-02-10'),
      endDate: new Date('2026-02-20'),
      status: 'Publicado',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      instructor: {
        id: 'inst-4',
        name: 'Ana Torres',
        role: 'Marketing Specialist',
        avatarUrl: 'https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png',
        bio: 'Especialista en crecimiento digital y estrategias de contenido.'
      },
      syllabus: [
        {
          title: 'SEO Básico',
          description: 'Cómo posicionar tu web en Google.',
          topics: [{ title: 'Keywords y Metadatos', duration: 40 }]
        }
      ]
    }
  ];

  constructor() { }

  getCourses(): CourseModel[] {
    return this.courses;
  }

  getCourseById(id: string): CourseModel | undefined {
    return this.courses.find(course => course.id === id);
  }
}
