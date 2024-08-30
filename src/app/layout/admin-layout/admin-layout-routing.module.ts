import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'portfolios',
        loadComponent: () => import('../../admin/portfolios/portfolios.component')
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'testimonials',
        loadComponent: () => import('../../admin/testimonials/testimonials.component')
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'services',
        loadComponent: () => import('../../admin/services/services.component')
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'contact-list',
        loadComponent: () => import('../../admin/contact-list/contact-list.component')
      },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {}
