import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { FrontLayoutService } from '../../layout/front-layout/front-layout.service';
import { CommonService } from 'src/app/shared/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactUsComponent } from '../contact-us/contact-us.component';
@Component({
  selector: 'app-portfolio-details',
  standalone: true,
  imports: [RouterModule, SharedModule, ContactUsComponent],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.scss'
})
export class PortfolioDetailsComponent {
  portfolio;
  portfolioSlug;
  constructor(private frontLayoutService: FrontLayoutService,
    public commonService: CommonService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.portfolioSlug = params['slug'];
    }
    );
    this.getPortfolio();
  }

  getPortfolio(): void {
    let portfolioParams = {
      'slug': this.portfolioSlug,
    }
    this.frontLayoutService.getPortfolioDetails(portfolioParams).subscribe(
      (response: any) => {
        if (response?.meta?.code === 200) {
          this.portfolio = response.data
          document.title = this.portfolio['title'] + ' | Chasemind Solution'

        }
      },
      (error) => {
        console.error('Error fetching portfolio:', error?.error?.Message);
      }
    );
  }
}
