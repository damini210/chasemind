import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { CommonService } from '../../shared/common.service';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    environment: any;

    constructor(private http: HttpClient) { }

    
    adminLogin(data: any): Observable<any>  {
        return this.http.post('http://localhost:5001/v1/adminAuth/login', data);
    }

}