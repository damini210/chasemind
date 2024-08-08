import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginService } from '../login/login.service';
import { CommonService } from 'src/app/shared/common.service';
import { StorageService, StorageKey } from 'src/app/shared/storage.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export default class LoginComponent {
  submittedLoginData = false;
  get fLoginData() { return this.loginForm.controls; }
  constructor(private fb: FormBuilder, public loginService: LoginService, public commonService: CommonService, public storageService: StorageService, private router: Router) { }

  ngOnInit() {
    if(this.storageService.getValue('myToken')){
      this.router.navigate(['/admin']);
    }
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
    pwd: ['', Validators.required]
  });

  onSubmit() {
    this.submittedLoginData = true;
    if (this.loginForm.invalid) {
      return;
    }
    let loginObj = Object.assign({}, this.loginForm.getRawValue());
    this.loginService.adminLogin(loginObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.storageService.setValue(StorageKey.myToken, Response.data.token);
        this.storageService.setValue(StorageKey._id, Response.data.user._id);
        this.storageService.setValue(StorageKey.Name, Response.data.user.name);
        this.storageService.setValue(StorageKey.email, Response.data.user.email);
        this.router.navigate(['/admin/portfolios']);
        this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }
}
