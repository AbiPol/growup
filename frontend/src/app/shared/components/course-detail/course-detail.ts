import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { RatingModule } from 'primeng/rating';
import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { CourseModel } from '../../../core/models/course.model';


@Component({
  selector: 'growup-course-detail',
  imports: [
    FormsModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    CardModule,
    ChipModule,
    DividerModule,
    GalleriaModule,
    TagModule,
    TimelineModule,
    RatingModule,
    AccordionModule,
    RouterLink
  ],
  templateUrl: './course-detail.html',
  styles: ``,
})
export class CourseDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  // Signals para reactividad
  course = signal<CourseModel | undefined>(undefined);

  cancel: boolean = false;
  value: number | null = 0;
  valuerating!: number;

  toggleModule(index: number): void {
    if (this.value === index) {
      this.value = null;
    } else {
      this.value = index;
    }
  }

  ngOnInit(): void {
    this.valuerating = 3;
    //this.value = 0; // Abrir el primer módulo por defecto

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundCourse = this.courseService.getCourseById(id);
      //console.log('Curso encontrado: ', foundCourse)
      if (foundCourse) {
        this.course.set(foundCourse);
      } else {
        this.router.navigate(['/courses']); // Redirigir si no existe
      }
    }

  }
}
