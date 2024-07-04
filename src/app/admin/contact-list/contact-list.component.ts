import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminService } from '../../layout/admin/admin.service';
import { CommonService } from 'src/app/shared/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})


export default class contactListComponent {
  displayedColumns: string[] = ['no', 'name', 'email', 'subject', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  contactMasterList: any;
  contactDetail= [];
  constructor(
    public adminService: AdminService,
    public commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getContactList();
  }


  getContactList() {
    this.adminService.getContactMaster().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.contactMasterList = new MatTableDataSource(Response.data);
        this.contactMasterList.paginator = this.paginator;
        this.contactMasterList.sort = this.sort;
      } else {
      }
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contactMasterList.filter = filterValue.trim().toLowerCase();
  }

  openModel(val) {
    this.contactDetail = val
    $('#contactModal').modal('show')
  }

  closeModal() {
    $('#contactModal').modal('hide')
  };
}
