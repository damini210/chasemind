// Angular import
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FrontService } from '../front.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  submittedContactUslData= false;
  get fContactUsData() { return this.contactUsForm.controls; }
  constructor(
    private fb: FormBuilder,
    public frontService: FrontService,
    public commonService: CommonService
  ) { }

  contactUsForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactUsForm.invalid) {
      this.submittedContactUslData = true;
      return;
    }
    let contactUsObj = Object.assign({}, this.contactUsForm.getRawValue());
    this.frontService.saveContactMaster(contactUsObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.commonService.notifier.notify('success', Response.meta.message);
        this.contactUsForm.reset();
        this.submittedContactUslData = false;
      }
      else {
        this.commonService.notifier.notify('error', Response.meta.message);
      }
    });
  };
}
