import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import PortfolioDetailsComponent from './front/portfolio-details/portfolio-details.component';
import { FrontLayoutComponent } from './layout/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: [{
      path: '',
      component: FrontLayoutComponent
    },
    { path: 'portfolio-details', component: PortfolioDetailsComponent },
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./layout/admin-layout/admin-layout.module').then((m) => m.AdminLayoutModule)
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
