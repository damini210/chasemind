import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { NavigationItem } from './layout/admin/navigation/navigation';
import { NavBarComponent } from './layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './layout/admin/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from './layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './layout/admin/nav-bar/nav-logo/nav-logo.component';
import { NavContentComponent } from './layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './shared/shared.module';
import { CommonService } from '../app/shared/common.service'
import { NotifierModule } from 'angular-notifier';
import * as $ from 'jquery';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    AdminComponent,
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
