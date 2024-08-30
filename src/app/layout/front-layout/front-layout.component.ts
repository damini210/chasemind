import { Component, OnInit } from '@angular/core';
import { ServicesComponent } from './services/services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { Title } from '@angular/platform-browser';
import { PortfolioComponent } from './portfolio/portfolio.component';

@Component({
  selector: 'app-front-layout',
  imports: [ServicesComponent, ContactUsComponent, PortfolioComponent],
  standalone: true,
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Welcome | Chasemind Solution Pvt. Ltd.');
  }

  ngOnInit(): void {
  }

  scrolltoTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
    // document.querySelector('#scrolltoTop').scrolltoTop({ behavior: 'smooth', block: 'top' })
  }
}
