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

@Component({
  selector: 'app-portfolios',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './portfolios.component.html',
  styleUrl: './portfolios.component.scss'
})

export default class PortfoliosComponent {
  displayedColumns: string[] = ['no', 'title', 'type', 'shortDesc', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  portfolioMasterList: any;

  submittedPortfolioData = false;
  imageUrl: string | ArrayBuffer | null = null;
  img_validate = false;
  get fPortfolioData() { return this.portfolioForm.controls; }
  file: any;
  typeLists = { 1: 'web', 2: 'mobile' };
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
    shortDesc: ['', Validators.required],
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
    portfolioObj.append('shortDesc', this.portfolioForm.value.shortDesc);
    portfolioObj.append('type', this.portfolioForm.value.type);
    portfolioObj.append('Image', this.file);

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
      debugger;
      this.adminLayoutService.getPortfolioMasterId(portfolioParams).subscribe((Response: any) => {
        if (Response.meta.code == 200) {
          this.portfolioForm.controls._id.setValue(Response.data._id);
          this.portfolioForm.controls.title.setValue(Response.data.title);
          this.portfolioForm.controls.shortDesc.setValue(Response.data.shortDesc);
          this.portfolioForm.controls.type.setValue(Response.data.type);

          if (Response.data.Image != "") {
            this.imageUrl = environment.uploadsUrl + "photos/" + Response.data.Image;

            this.file = Response.data.Image;
          } else {
            this.imageUrl = "";
            this.file = "";
          }
          this.getPortfolioList();
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
        this.commonService.notifier.notify('success', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
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
