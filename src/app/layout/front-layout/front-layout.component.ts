import { Component, OnInit } from '@angular/core';
import { ServicesComponent } from '../../front/services/services.component';
import { ContactUsComponent } from '../../front/contact-us/contact-us.component';
import { Title } from '@angular/platform-browser';
import { PortfolioComponent } from '../../front/portfolio/portfolio.component';
import { FrontNavBarComponent } from '../../front/front-nav-bar/front-nav-bar.component';
import { FooterComponent } from '../../front/footer/footer.component';

@Component({
  selector: 'app-front-layout',
  imports: [ServicesComponent, ContactUsComponent, PortfolioComponent, FrontNavBarComponent, FooterComponent],
  standalone: true,
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Welcome | Chasemind Solution Pvt. Ltd.');
  }


  scrolltoTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
    // document.querySelector('#scrolltoTop').scrolltoTop({ behavior: 'smooth', block: 'top' })
  }
}
