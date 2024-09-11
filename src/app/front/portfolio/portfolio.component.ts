import { Component, OnInit } from '@angular/core';
import { FrontLayoutService } from '../../layout/front-layout/front-layout.service';
import { CommonService } from 'src/app/shared/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  typeLists = { 1: 'Website', 2: 'Mobile' };
  portfolioList: any[] = [];
  isLoading = true; // New loading state
  errorMessage = ''; // New error state

  constructor(
    private frontLayoutService: FrontLayoutService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getPortfolio();
  }

  getPortfolio(): void {
    this.isLoading = true; // Start loading state
    this.frontLayoutService.getPortfolioList().subscribe(
      (response: any) => {
        if (response?.meta?.code === 200) {
          this.portfolioList = response.data.slice(0, 3);
        }
        this.isLoading = false; // Stop loading once data is fetched
      },
      (error) => {
        this.isLoading = false; // Stop loading if there is an error
        this.errorMessage = 'Failed to load portfolio data';
        console.error('Error fetching portfolio:', error?.error?.Message);
      }
    );
  }
}
