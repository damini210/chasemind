import { Component } from '@angular/core';
import { FrontLayoutService } from '../../layout/front-layout/front-layout.service';
import { CommonService } from 'src/app/shared/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-all-portfolios',
  templateUrl: './all-portfolios.component.html',
  standalone: true,
  imports: [SharedModule, RouterModule],
  styleUrl: './all-portfolios.component.scss'
})
export class AllPortfoliosComponent {

  typeLists = { 1: 'Website', 2: 'Mobile' };
  portfolioList: any[] = [];
  isLoading = true; // New loading state
  errorMessage = ''; // New error state
  constructor(private frontLayoutService: FrontLayoutService, public commonService: CommonService) { }

  ngOnInit(): void {
    document.title = 'Our Achievements in Web, Mobile, and Software Innovation | Chasemind Solution'
    this.getPortfolio();
  }
  // getPortfolio() {
  //   this.frontLayoutService.getPortfolioList().subscribe((Response: any) => {
  //     if (Response.meta.code == 200) {
  //       this.portfolioList = Response.data
  //     }
  //   }, (error) => {
  //     console.log(error.error.Message);
  //   });
  // }
  getPortfolio(): void {
    this.isLoading = true; // Start loading state
    this.frontLayoutService.getPortfolioList().subscribe(
      (response: any) => {
        if (response?.meta?.code === 200) {
          this.portfolioList = response.data;
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
