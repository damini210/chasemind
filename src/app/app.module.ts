import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { NavigationItem } from './layout/admin-layout/navigation/navigation';
import { NavBarComponent } from './layout/admin-layout/nav-bar/nav-bar.component';
import { NavLeftComponent } from './layout/admin-layout/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './layout/admin-layout/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from './layout/admin-layout/navigation/navigation.component';
import { NavLogoComponent } from './layout/admin-layout/nav-bar/nav-logo/nav-logo.component';
import { NavContentComponent } from './layout/admin-layout/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './layout/admin-layout/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './layout/admin-layout/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './layout/admin-layout/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './shared/shared.module';
import { CommonService } from '../app/shared/common.service'
import { NotifierModule } from 'angular-notifier';
import * as $ from 'jquery';
import { FrontLayoutComponent } from './layout/front-layout/front-layout.component';
import { FrontNavBarComponent } from './front/front-nav-bar/front-nav-bar.component';
import { FooterComponent } from './front/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FrontLayoutComponent,
    FrontNavBarComponent,
    FooterComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavItemComponent,
    NavCollapseComponent,
  ],
  imports: [
    BrowserModule, 
    RouterModule,
    AppRoutingModule, 
    SharedModule, 
    BrowserAnimationsModule,
    NotifierModule.withConfig({
      // Custom options in here
      position: {
        horizontal: {
          position: 'middle',
          //distance: 50,
        },
        vertical: {
          position: 'bottom',
          distance: 50,
          gap: 10
        },
      },
      //behaviour: {
      //  autoHide: false
      //}
    }),
  ],
  providers: [CommonService, NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule {}
