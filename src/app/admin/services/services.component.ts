import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminLayoutService } from '../../layout/admin-layout/admin-layout.service';
import { CommonService } from 'src/app/shared/common.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import * as bootstrap from "bootstrap";

declare const $: any;

interface testimonialMasterData {
  Title: string;
  Categories: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export default class ServicesComponent {
  displayedColumns: string[] = ['Title'];

  submittedTestimonialData = false;
  testimonialMasterList: testimonialMasterData[];
  allTestimonialMaster: testimonialMasterData[];
  testimonialMasterListlength: any;
  noData;

  get fTestimonialData() { return this.testimonialForm.controls; }
  constructor(
    private fb: FormBuilder,
    public adminLayoutService: AdminLayoutService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    // this.noData = false;
    // this.mySelect = 5;
    // this.l = 5;
    this.getTestimonialList();
  }

  testimonialForm = this.fb.group({
    clientName: ['', Validators.required],
    review: ['', Validators.required],
    countryName: ['', Validators.required]
  });

  onSubmit() {
    if (this.testimonialForm.invalid) {
      this.submittedTestimonialData = true;
      return;
    }
    let testimonialObj = Object.assign({}, this.testimonialForm.getRawValue());
    this.adminLayoutService.saveTestimonialMaster(testimonialObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.commonService.notifier.notify('success', Response.meta.message);
        this.testimonialForm.reset();
        this.submittedTestimonialData = false;
        this.closeModal();
      }
      else {
        this.commonService.notifier.notify('error', Response.meta.message);
      }
    });

  };

  getTestimonialList() {

    this.adminLayoutService.getTestimonnialMaster().subscribe((Response: any) => {
      console.log(Response.meta.code)
      if (Response.meta.code == 200) {

        this.testimonialMasterList = Response.data;
        this.allTestimonialMaster = this.testimonialMasterList
        this.testimonialMasterList = this.testimonialMasterList.slice();
        console.log(Response.data);
        this.testimonialMasterListlength = Response.data.length;
        if (this.testimonialMasterListlength > 0) {
          this.noData = false;
        } else {
          this.noData = true;
        }
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
