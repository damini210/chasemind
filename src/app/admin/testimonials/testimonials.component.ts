import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminLayoutService } from '../../layout/admin-layout/admin-layout.service';
import { CommonService } from 'src/app/shared/common.service';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../src/environments/environment';

declare const $: any;
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export default class TestimonialsComponent {
  displayedColumns: string[] = ['no', 'clientName', 'review', 'countryName', 'actions'];
  testimonialMasterList: any;

  submittedTestimonialData = false;
  imageUrl: string | ArrayBuffer | null = null;
  file: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  testimonialForm = this.fb.group({
    _id: [''],
    clientName: ['', Validators.required],
    review: ['', Validators.required],
    countryName: ['', Validators.required]
  });


  get fTestimonialData() { return this.testimonialForm.controls; }

  constructor(
    private fb: FormBuilder,
    public adminLayoutService: AdminLayoutService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    this.getTestimonialList();
  }

  getTestimonialList() {
    this.adminLayoutService.getTestimonialMaster().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.testimonialMasterList = new MatTableDataSource(Response.data);
        this.testimonialMasterList.paginator = this.paginator;
        this.testimonialMasterList.sort = this.sort;
      }
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  onSubmit() {
    if (this.testimonialForm.invalid) {
      this.submittedTestimonialData = true;
      return;
    }

    const formData = this.createFormData();
    this.adminLayoutService.saveTestimonialMaster(formData, this.testimonialForm.value._id).subscribe(
      (response: any) => {
        if (response.meta.code === 200) {
          this.commonService.notifier.notify('success', response.meta.message);
          this.closeModal();
          this.getTestimonialList();
        } else {
          this.commonService.notifier.notify('error', response.meta.message);
        }
      }
    );
  }

  // Open modal for editing testimonials
  openModel(testimonialId: string) {
    if (testimonialId) {
      this.fetchTestimonialById(testimonialId);
    }
    $('#testimonialModal').modal('show');
  }

  // Fetch testimonial by ID
  private fetchTestimonialById(testimonialId: string) {
    this.adminLayoutService.getTestimonialMasterId({ _id: testimonialId }).subscribe(
      (response: any) => {
        if (response.meta.code === 200) {
          this.populateFormWithTestimonialData(response.data);
        } else {
          this.commonService.notifier.notify('error', response.meta.message);
        }
      },
      error => {
        this.commonService.notifier.notify('error', error.error.Message);
      }
    );
  }

  // Populate form with testimonial data
  private populateFormWithTestimonialData(data: any) {
    this.testimonialForm.setValue({
      _id: data._id,
      clientName: data.clientName,
      review: data.review,
      countryName: data.countryName
    });
    this.imageUrl = data.clientImage ? `${environment.uploadsUrl}client_image/${data.clientImage}` : null;
    this.file = data.Image || null;
  }

  // Create form data object
  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('_id', this.testimonialForm.value._id);
    formData.append('clientName', this.testimonialForm.value.clientName);
    formData.append('review', this.testimonialForm.value.review);
    formData.append('countryName', this.testimonialForm.value.countryName);
    if (this.file) {
      formData.append('clientImage', this.file);
    }
    return formData;
  }

  closeModal() {
    this.resetForm();
    $('#testimonialModal').modal('hide')
  };

  // Reset form and input
  private resetForm() {
    this.testimonialForm.reset();
    this.submittedTestimonialData = false;
    this.file = null;
    this.imageUrl = null;
    const input = document.querySelector('#featuredfile') as HTMLInputElement;
    if (input) {
      input.value = ''; // Clear the input field
    }
  }

  changeStatus(paramsObj) {
    let statusTestimonialModelObj = {
      "_id": paramsObj.id,
      "status": paramsObj.status
    };
    this.adminLayoutService.statusTestimonial(statusTestimonialModelObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.getTestimonialList();
        this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      this.commonService.notifier.notify('error', 'Failed to update status. Please try again');
    });
  }

  preview(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }
}
