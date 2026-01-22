import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { CourseModel } from '../../../core/models/course.model';


@Component({
  selector: 'growup-curso-card',
  imports: [
    CardModule,
    ButtonModule,
    TagModule,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './curso-card.html',
  styles: ``,
})
export class CursoCard {

  @Input()
  course!: CourseModel;

  constructor() {
    //    console.log('curso: ', this.course);
  }
}
