// Angular import
import { Component, OnInit } from '@angular/core';
import { FrontLayoutService } from '../../layout/front-layout/front-layout.service';
import { CommonService } from 'src/app/shared/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  typeLists = { 1: 'Website', 2: 'Mobile' };

  constructor(
    public frontLayoutService: FrontLayoutService,
    public commonService: CommonService
  ) { }
  
  portfolioList: any;

  ngOnInit(): void {
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