import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { CourseModel } from '../../../core/models/course.model';

import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SkeletonModule } from 'primeng/skeleton';
import { CursoCard } from "../../../shared/components/curso-card/curso-card";


@Component({
  selector: 'growup-catalogo',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SkeletonModule,
    CursoCard
  ],
  templateUrl: './catalogo.html',
  styles: ``,
})

export class Catalogo implements OnInit, OnDestroy {

  courseService = inject(CourseService);
  loading = signal(true);
  filteredCourses: CourseModel[] = [];

  ngOnInit() {
    this.filteredCourses = this.courseService.getCourses();
    //console.log('this.filteredCourses: ', this.filteredCourses);

    // Simular carga de datos para ver el Skeleton
    setTimeout(() => {
      this.loading.set(false);
      //console.log('this.loading: ', this.loading);
    }, 2000); // He bajado el tiempo a 2s para que no esperes tanto probando
  }

  buscaCurso(text: string) {
    if (!text) {
      this.filteredCourses = this.courseService.getCourses();
      return;
    }

    this.filteredCourses = this.courseService.getCourses().filter(course =>
      course.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  ngOnDestroy() {
    this.loading.set(true);
  }
}
