import { Component, OnInit } from '@angular/core';
import { ServicesComponent } from './services/services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-front',
  imports: [ServicesComponent, ContactUsComponent],
  standalone: true,
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

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
