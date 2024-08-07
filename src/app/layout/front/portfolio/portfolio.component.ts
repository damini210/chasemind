// Angular import
import { Component, OnInit } from '@angular/core';
import { FrontService } from '../front.service';
import { CommonService } from 'src/app/shared/common.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  typeLists = { 1: 'Website', 2: 'Mobile' };

  constructor(
    public frontService: FrontService,
    public commonService: CommonService
  ) { }
  
  portfolioList: any;

  ngOnInit(): void {
    this.getPortfolio();
  }

  getPortfolio() {
    this.frontService.getPortfolioList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.portfolioList = Response.data
      }
    }, (error) => {
      console.log(error.error.Message);
    });
  }
}
