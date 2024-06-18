// Angular import
import { Component } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

// Project import
import { BerryConfig } from '../../app-config';
import { StorageService, StorageKey } from 'src/app/shared/storage.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  // public props
  berryConfig;
  navCollapsed: boolean;
  navCollapsedMob = false;
  windowWidth: number;

  // Constructor
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    public storageService: StorageService,
    private router: Router,
    public commonService: CommonService,
    private http: HttpClient
  ) {
    this.berryConfig = BerryConfig;
    // this.tokenCheck();
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    if (current_url === baseHref + '/layout/theme-compact' || current_url === baseHref + '/layout/box') {
      this.berryConfig.isCollapse_menu = true;
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 1025 ? BerryConfig.isCollapse_menu : false;
  }

  // public method
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.coded-navbar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  tokenCheck() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('myToken')}`
    })
    this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/tokenCheck', { headers: headers }).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

      } else {
        this.storageService.removeValue(StorageKey.myToken);
        this.storageService.removeValue(StorageKey._id);
        this.storageService.removeValue(StorageKey.Name);
        this.storageService.removeValue(StorageKey.email);
        this.router.navigate(['/admin/login']);
      }
    }, (error) => {
      this.storageService.removeValue(StorageKey.myToken);
      this.storageService.removeValue(StorageKey._id);
      this.storageService.removeValue(StorageKey.Name);
      this.storageService.removeValue(StorageKey.email);
      this.router.navigate(['/admin/login']);
      console.log(error);
    })

  }
}
