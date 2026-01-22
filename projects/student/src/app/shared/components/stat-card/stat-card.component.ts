import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'growup-stat-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <article class="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 cursor-pointer">
        <div class="flex justify-between mb-4">
            <div>
                <span class="block text-gray-500 dark:text-gray-200 font-medium mb-2">{{ title() }}</span>
                <div class="text-gray-900 dark:text-white font-bold text-2xl">{{ value() }}</div>
            </div>
            <div [class]="'flex items-center justify-center rounded-lg w-10 h-10 ' + iconBgColor()">
                <i [class]="'pi text-xl ' + icon() + ' ' + iconColor()"></i>
            </div>
        </div>
        @if (footerValue() || footerText()) {
            <div class="text-sm">
                <span [class]="'font-medium ' + footerValueColor()">{{ footerValue() }}</span>
                <span class="text-gray-500 dark:text-gray-300 ml-1">{{ footerText() }}</span>
            </div>
        }
    </article>
  `
})
export class StatCardComponent {
    title = input<string>('');
    value = input<number | string>(0);
    icon = input<string>('');
    iconBgColor = input<string>('bg-blue-100');
    iconColor = input<string>('text-blue-600');
    footerValue = input<string>('');
    footerValueColor = input<string>('text-green-500');
    footerText = input<string>('');
}
