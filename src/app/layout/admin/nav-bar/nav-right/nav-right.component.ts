// Angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, StorageKey } from '../../../../shared/storage.service';
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  profileName: any;
  
  constructor(private router: Router,
    public storageService: StorageService) {
  };
  ngOnInit() {
    this.profileName = this.storageService.getValue('name')
  };

  logout() {
    this.storageService.removeValue(StorageKey.myToken);
    this.storageService.removeValue(StorageKey._id);
    this.storageService.removeValue(StorageKey.Name);
    this.storageService.removeValue(StorageKey.email);
    this.storageService.removeValue(StorageKey.roleId);
    this.storageService.removeValue(StorageKey.accountType);
    this.storageService.removeValue(StorageKey.profileImage);
    this.storageService.removeValue(StorageKey.Issellerlogin);
    this.router.navigate(['/admin/login']);
  }
}
