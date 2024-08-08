import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CommonService } from '../shared/common.service';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    environment: any;

    constructor(private http: HttpClient, private commonService: CommonService) { }

    
    adminLogin(data: any): Observable<any>  {
        return this.http.post(this.commonService.rootData.rootUrl + 'login', data);
    }

}