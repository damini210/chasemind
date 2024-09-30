import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { AdminLayoutService } from 'src/app/layout/admin-layout/admin-layout.service';
import { CommonService } from 'src/app/shared/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-portfolios',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './portfolios.component.html',
  styleUrl: './portfolios.component.scss'
})

export default class PortfoliosComponent {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '20rem',
    maxHeight: '20rem',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
  };

  noData = false;
  displayedColumns: string[] = ['no', 'title', 'type', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  portfolioMasterList: any;

  submittedPortfolioData = false;
  imageUrl: string | ArrayBuffer | null = null;
  img_validate = false;
  get fPortfolioData() { return this.portfolioForm.controls; }
  file: any;
  typeLists = { 1: 'web', 2: 'mobile' };
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  get typeKeys() {
    return Object.keys(this.typeLists);
  }
  constructor(
    private fb: FormBuilder,
    public adminLayoutService: AdminLayoutService,
    public commonService: CommonService
  ) { }

  portfolioForm = this.fb.group({
    _id: [''],
    title: ['', Validators.required],
    slug: ['', Validators.required],
    projectInfo: ['', Validators.required],
    shortDesc: ['', Validators.required],
    longDesc: ['', Validators.required],
    type: ['', Validators.required],
  });

  ngOnInit() {
    this.getPortfolioList();
  }

  getPortfolioList() {
    this.adminLayoutService.getPortfolioMaster().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.portfolioMasterList = new MatTableDataSource(Response.data);
        this.portfolioMasterList.paginator = this.paginator;
        this.portfolioMasterList.sort = this.sort;
      }
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.portfolioMasterList.filter = filterValue.trim().toLowerCase();
  }

  // Handle file selection
  onFileSelected(event: any) {
    const files = event.target.files;

    // Loop through the files and generate previews
    Array.from(files).forEach((file: any) => {
      this.selectedFiles.push(file);  // Add file to the selectedFiles array
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result); // Add image preview
      };
      reader.readAsDataURL(file);
    });
  }

  // Remove an image by index
  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);   // Remove the file
    this.imagePreviews.splice(index, 1);   // Remove the preview
  }



  onSubmit() {
    if (this.portfolioForm.invalid || this.imageUrl == "" || !this.imageUrl) {
      if (this.imageUrl == "" || !this.imageUrl) {
        this.img_validate = true;
      }
      this.submittedPortfolioData = true;
      return;
    }
    let portfolioObj: FormData = new FormData();
    portfolioObj.append('_id', this.portfolioForm.value._id);
    portfolioObj.append('title', this.portfolioForm.value.title);
    portfolioObj.append('slug', this.portfolioForm.value.slug);
    portfolioObj.append('projectInfo', this.portfolioForm.value.projectInfo);
    portfolioObj.append('shortDesc', this.portfolioForm.value.shortDesc);
    portfolioObj.append('longDesc', this.portfolioForm.value.longDesc);
    portfolioObj.append('type', this.portfolioForm.value.type);
    portfolioObj.append('Image', this.file);
    this.selectedFiles.forEach((file, index) => {
      portfolioObj.append('projectImages', file); 
    });

    this.adminLayoutService.savePortfolioMaster(portfolioObj, this.portfolioForm.value._id).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.commonService.notifier.notify('success', Response.meta.message);
        this.portfolioForm.reset();
        this.submittedPortfolioData = false;
        this.closeModal();
        this.imageUrl = null;
        this.getPortfolioList();
      }
      else {
        this.commonService.notifier.notify('error', Response.meta.message);
      }
    });

  };

  openModel(portfolioId) {
    if (portfolioId != "") {
      let portfolioParams = {
        '_id': portfolioId,
      }
      this.adminLayoutService.getPortfolioMasterId(portfolioParams).subscribe((Response: any) => {
        if (Response.meta.code == 200) {
          this.portfolioForm.controls._id.setValue(Response.data._id);
          this.portfolioForm.controls.title.setValue(Response.data.title);
          this.portfolioForm.controls.slug.setValue(Response.data.slug);
          this.portfolioForm.controls.projectInfo.setValue(Response.data.projectInfo);
          this.portfolioForm.controls.shortDesc.setValue(Response.data.shortDesc);
          this.portfolioForm.controls.longDesc.setValue(Response.data.longDesc);
          this.portfolioForm.controls.type.setValue(Response.data.type);

          if (Response.data.Image != "") {
            this.imageUrl = environment.uploadsUrl + "photos/" + Response.data.Image;

            this.file = Response.data.Image;

          } else {
            this.imageUrl = "";
            this.file = "";
          }
        this.imagePreviews.push(Response.data.projectImages); // Add image preview
            console.log(this.imagePreviews)
          // this.getPortfolioList();
        }
        else {
          this.commonService.notifier.notify('error', Response.meta.message);
        }
      }, (error) => {
        this.commonService.notifier.notify('error', error.error.Message);
      });
    }
    $('#portfolioModal').modal('show')
  };

  closeModal() {
    this.portfolioForm.reset();
    this.submittedPortfolioData = false;
    this.img_validate = false;
    this.file = null;
    this.imageUrl = null;
    this.imagePreviews = []
    const input = document.querySelector('#featuredfile') as HTMLInputElement;
    const projectImageInput = document.querySelector('#projectImage') as HTMLInputElement;
    if (input) {
      input.value = ''; // Clear the input field
    }
    if (projectImageInput) {
      projectImageInput.value = ''; // Clear the input field
    }
    $('#portfolioModal').modal('hide')
  };


  changeStatus(paramsObj) {

    let statusPortfolioModelObj = {
      "_id": paramsObj.id,
      "status": paramsObj.status
    };


    this.adminLayoutService.statusPortfolio(statusPortfolioModelObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.getPortfolioList();
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
        this.img_validate = false;
      };
      reader.readAsDataURL(this.file);
    }
  }
}
