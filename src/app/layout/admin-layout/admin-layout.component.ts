// Angular import
import { Component } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

// Project import
import { ChasemindConfig } from '../../app-config';
import { StorageService, StorageKey } from 'src/app/shared/storage.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  // public props
  chasemindConfig;
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
    this.chasemindConfig = ChasemindConfig;
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    if (current_url === baseHref + '/layout/theme-compact' || current_url === baseHref + '/layout/box') {
      this.chasemindConfig.isCollapse_menu = true;
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 1025 ? ChasemindConfig.isCollapse_menu : false;
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
}
