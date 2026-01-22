import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { StudentStats } from '../../../core/models/student-stats.model';
import { Notification } from '../../../core/models/notification.model';
import { EnrolledCourse } from '../../../core/models/enrollment.model';
import { DashboardService } from '../../../core/services/dashboard.service';

import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { CourseGroupComponent } from '../../../shared/components/course-group/course-group';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { BadgeModule } from 'primeng/badge';


@Component({
  selector: 'growup-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    //RouterLinkActive,
    StatCardComponent,
    CourseGroupComponent,
    CardModule,
    ButtonModule,
    AvatarModule,
    TagModule,
    ProgressBarModule,
    ChartModule,
    BadgeModule
  ],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard implements OnInit {
  stats: StudentStats | null = null;
  notifications: Notification[] = [];

  private dashboardService = inject(DashboardService);

  // Señal base de todos los cursos
  allCourses = this.dashboardService.getEnrolledCourses();

  /**
   * Señal computada para filtrar SOLO los cursos activos para el Dashboard.
   * Esto es formación: Usamos 'computed' para que la lista se actualice 
   * automáticamente si el DashboardService cambia la señal original.
   */
  activeCourses = computed(() =>
    this.allCourses().filter(c => c.status === 'active')
  );

  // Chart Config
  activityChartData: any;
  activityChartOptions: any;

  completionChartData: any;
  completionChartOptions: any;

  constructor() { }

  ngOnInit() {
    this.loadData();
    this.initCharts();
  }

  loadData() {
    this.dashboardService.getStudentStats().subscribe(data => this.stats = data);
    this.dashboardService.getNotifications().subscribe(data => this.notifications = data);
    // Ya no hacemos subscribe a courses porque es un Signal
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Chart 1: Activity (Simulated) - Bar Chart
    this.activityChartData = {
      labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
      datasets: [
        {
          label: 'Horas de aprendizaje',
          data: [2, 3.5, 1, 4, 2.5, 0.5, 3],
          backgroundColor: '#22C55E', // brand-500
          borderColor: '#22C55E',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    };

    this.activityChartOptions = {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#6b7280' // gray-500
          },
          grid: {
            color: '#f3f4f6', // gray-100
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: '#6b7280'
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    };

    // Chart 2: Completion Rates - Doughnut
    this.completionChartData = {
      labels: ['Completado', 'En Progreso', 'Pendiente'],
      datasets: [
        {
          data: [12, 3, 5],
          backgroundColor: [
            '#22C55E', // brand-500 (Green)
            '#F59E0B', // warning (Yellow/Orange)
            '#3b82f6'  // blue-500
          ],
          hoverBackgroundColor: [
            '#16A34A', // brand-600
            '#D97706', // amber-600
            '#2563eb'  // blue-600
          ]
        }
      ]
    };

    this.completionChartOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: '#1f2937' // gray-800
          },
          position: 'bottom'
        }
      },
      cutout: '60%'
    };
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'archived': return 'secondary';
      default: return 'info';
    }
  }
}
