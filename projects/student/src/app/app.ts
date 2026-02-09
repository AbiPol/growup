import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'growup-student',
  imports: [
    RouterModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('growup-frontend');



}
