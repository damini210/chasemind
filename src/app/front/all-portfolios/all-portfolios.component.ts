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

  constructor(public frontLayoutService: FrontLayoutService,
    public commonService: CommonService) {
  }

  portfolioList: any;
  ngOnInit(): void {
    document.title = 'Our Portfolios'
    this.getPortfolio();
  }
  getPortfolio() {
    this.frontLayoutService.getPortfolioList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.portfolioList = Response.data
      }
    }, (error) => {
      console.log(error.error.Message);
    });
  }
}
