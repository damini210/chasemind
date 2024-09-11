import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioDetailsComponent } from '../../front/portfolio-details/portfolio-details.component';
import { DashboardComponent } from 'src/app/front/dashboard/dashboard.component';
import { AllPortfoliosComponent } from 'src/app/front/all-portfolios/all-portfolios.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'portfolios/:id', component: PortfolioDetailsComponent },
  { path: 'portfolios', component: AllPortfoliosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontLayoutRoutingModule { }
