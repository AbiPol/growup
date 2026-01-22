import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrolledCourse } from '../../../core/models/enrollment.model';
import { CourseGroupComponent } from '../../../shared/components/course-group/course-group';
import { DashboardService } from '../../../core/services/dashboard.service';


@Component({
  selector: 'growup-mylearning',
  standalone: true,
  imports: [
    CommonModule,
    CourseGroupComponent
  ],
  templateUrl: './mylearning.html',
  styles: ``,
})
export class Mylearning {
  private dashboardService = inject(DashboardService);

  // Señal base de todos los cursos
  allCourses = this.dashboardService.getEnrolledCourses();

  /**
   * Cursos activos (en curso).
   */
  activeCourses = computed(() =>
    this.allCourses().filter(c => c.status === 'active')
  );

  /**
   * Cursos no empezados (nuevos).
   */
  notStartedCourses = computed(() =>
    this.allCourses().filter(c => c.status === 'not_started')
  );

  /**
   * Cursos completados.
   */
  completedCourses = computed(() =>
    this.allCourses().filter(c => c.status === 'completed')
  );

  /**
   * Cursos archivados.
   */
  archivedCourses = computed(() =>
    this.allCourses().filter(c => c.status === 'archived')
  );

  /**
   * Manejador de acciones para los cursos.
   */
  handleCourseAction(course: EnrolledCourse): void {
    console.log('Acción sobre el curso:', course.name, 'Estado:', course.status);
    // Aquí se implementaría la navegación o lógica de negocio (ej: empezar curso)
  }
}
