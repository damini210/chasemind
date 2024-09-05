declare const require: any;

import { Component, OnInit, Renderer2  } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent implements OnInit {

  constructor(private titleService: Title, private renderer: Renderer2) {
    this.titleService.setTitle('Welcome | Chasemind Solution Pvt. Ltd.');
  }

  ngOnInit(): void {
    this.loadScript();
  }

  loadScript() {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/main.js';  // Adjust the path according to your project structure
    script.onload = () => {
      console.log('Script loaded successfully.');
    };
    script.onerror = () => {
      console.error('Script failed to load.');
    };
    this.renderer.appendChild(document.body, script);
  }

  scrolltoTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
