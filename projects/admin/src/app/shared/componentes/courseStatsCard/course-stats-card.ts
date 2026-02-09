import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'growup-course-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <i class="pi pi-users text-lg"></i>
        </div>
        <div class="flex flex-col">
            <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">Inscritos</span>
            <span class="text-lg font-black text-gray-900 dark:text-white leading-none">{{ count() }}</span>
        </div>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class CourseStatsCard {
  count = input.required<number>();
}
