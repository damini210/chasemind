// Angular import
import { Component } from '@angular/core';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ContactUsComponent, PortfolioComponent, ServicesComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 

}
