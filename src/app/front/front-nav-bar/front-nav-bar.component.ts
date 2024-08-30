// Angular import
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-front-nav-bar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './front-nav-bar.component.html',
  styleUrls: ['./front-nav-bar.component.scss']
})
export class FrontNavBarComponent {
 

}
