import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-portfolio-details',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.scss'
})
export default class PortfolioDetailsComponent {

}
