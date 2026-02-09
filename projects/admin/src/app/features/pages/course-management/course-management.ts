import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../../core/services/courses.service';
import { CourseModel } from '@shared/models/course.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { CourseStatsCard } from '../../../shared/componentes/courseStatsCard/course-stats-card';
import { CoursePreviewDialog } from '../../../shared/componentes/coursePreviewDialog/course-preview-dialog';

@Component({
    selector: 'growup-course-management',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        TagModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        DialogModule,
        TooltipModule,
        DividerModule,
        FormsModule,
        TextareaModule,
        CourseStatsCard,
        CoursePreviewDialog
    ],
    templateUrl: './course-management.html',
    styleUrl: './course-management.scss'
})
export class CourseManagement {
    private coursesService = inject(CoursesService);

    buscandoCurso = signal<boolean>(false);
    // signals
    courses = this.coursesService.courses;
    coursesSearch = this.coursesService.coursesSearch;


    // selection & state
    selectedCourse = signal<CourseModel | null>(null);
    displayDetails = signal<boolean>(false);
    editingPrice = signal<number>(0);
    displayPriceEdit = signal<boolean>(false);

    getStatusSeverity(status: string) {
        switch (status) {
            case 'Publicado': return 'success';
            case 'En Revision': return 'warn';
            case 'Borrador': return 'secondary';
            default: return 'info';
        }
    }

    showDetails(course: CourseModel) {
        this.selectedCourse.set(course);
        this.displayDetails.set(true);
    }

    openPriceEdit(course: CourseModel) {
        this.selectedCourse.set(course);
        this.editingPrice.set(course.price);
        this.displayPriceEdit.set(true);
    }

    savePrice() {
        if (this.selectedCourse()) {
            this.coursesService.updatePrice(this.selectedCourse()!.id, this.editingPrice());
            this.displayPriceEdit.set(false);
            this.selectedCourse.set(null);
        }
    }

    buscaCurso(search: string) {
        if (search.length > 0) {
            this.buscandoCurso.set(true);
            this.coursesService.searchCourses(search);
        } else {
            this.buscandoCurso.set(false);
        }
    }
}
