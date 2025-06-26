import { Routes } from '@angular/router';
export const MainRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../../../pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    title: 'Dashboard',
  },
  {
    path: 'exam/:subjectId',
    loadComponent: () =>
      import('../../../pages/exam/exam.component').then(
        (c) => c.ExamComponent
      ),
    title: 'Exam',
  },
];
