import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminService } from '../../layout/admin/admin.service';
import { CommonService } from 'src/app/shared/common.service';
import * as bootstrap from "bootstrap";

declare const $: any;

interface contactListMasterData {
  Title: string;
  Categories: string;
}

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export default class contactListComponent {
  displayedColumns: string[] = ['clientName', 'email', 'subject', 'message'];

  submittedTestimonialData = false;
  testimonialMasterList: contactListMasterData[];
  allTestimonialMaster: contactListMasterData[];
  testimonialMasterListlength: any;
  noData;

  constructor(
    public adminService: AdminService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    // this.noData = false;
    // this.mySelect = 5;
    // this.l = 5;
    this.getContactList();
  }

  getContactList() {

    this.adminService.getContactMaster().subscribe((Response: any) => {
      console.log(Response.meta.code)
      if (Response.meta.code == 200) {
        console.log(Response.data, '11111111111111111');
        // this.testimonialMasterList = Response.data;
        // this.allTestimonialMaster = this.testimonialMasterList
        // this.testimonialMasterList = this.testimonialMasterList.slice();
        // console.log(Response.data);
        // this.testimonialMasterListlength = Response.data.length;
        // if (this.testimonialMasterListlength > 0) {
        //   this.noData = false;
        // } else {
        //   this.noData = true;
        // }
      } else {
        this.noData = true;
      }
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  openModel() {
    $('#exampleModal').modal('show')
  };

  closeModal() {
    $('#exampleModal').modal('hide')
  };
}
