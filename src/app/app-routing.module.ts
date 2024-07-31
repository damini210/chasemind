import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { FrontComponent } from './layout/front/front.component';

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [{
      path: '',
      component: FrontComponent
    }]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./layout/admin/admin.module').then((m) => m.AdminModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'admin/login',
        loadComponent: () => import('./login/login.component')
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
