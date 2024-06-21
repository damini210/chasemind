import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CommonService } from '../../shared/common.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    environment: any;

    constructor(private commonService: CommonService, private http: HttpClient) { }

    // testimonial

    saveTestimonialMaster(saveTestimonialMasterData: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'testimonial/create', saveTestimonialMasterData, { headers: headers });
    }

    getTestimonnialMaster() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'testimonial/get-testimonialDataList', { headers: headers });
    }
    //contact

    saveContactMaster(saveContactMasterData: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'contact/create', saveContactMasterData, { headers: headers });
    }

    getContactMaster() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'contact/get-contactDataList', { headers: headers });
    }

}