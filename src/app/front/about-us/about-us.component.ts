// Angular import
import { Component } from '@angular/core';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ServicesComponent } from '../services/services.component';
import { FrontLayoutService } from '../../layout/front-layout/front-layout.service';
import { CommonService } from 'src/app/shared/common.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SharedModule, ContactUsComponent, PortfolioComponent, ServicesComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
 
  testimonialList: any[] = [];

  constructor(
    private frontLayoutService: FrontLayoutService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getTestimonial();
  }

  getTestimonial(): void {
    this.frontLayoutService.getTestimonialList().subscribe(
      (response: any) => {
        if (response?.meta?.code === 200) {
          this.testimonialList = response.data;
        }
      },
      (error) => {
        console.error('Error fetching portfolio:', error?.error?.Message);
      }
    );
  }

}
