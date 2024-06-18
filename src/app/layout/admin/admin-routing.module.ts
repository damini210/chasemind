import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'testimonials',
        loadComponent: () => import('../../admin/testimonials/testimonials.component')
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'services',
        loadComponent: () => import('../../admin/services/services.component')
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
