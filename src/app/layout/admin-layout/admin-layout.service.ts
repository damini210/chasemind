import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CommonService } from '../../shared/common.service';

@Injectable({
    providedIn: 'root'
})
export class AdminLayoutService {
    environment: any;

    constructor(private commonService: CommonService, private http: HttpClient) { }

    //contact

    saveContactMaster(saveContactMasterData: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'contacts', saveContactMasterData, { headers: headers });
    }

    getContactMaster() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'contacts', { headers: headers });
    }

    //portfolio API
    savePortfolioMaster(createPortfolioMasterData: any, id) {
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        if (id) {
            return this.http.put(this.commonService.rootData.rootUrl + 'portfolio/' + id, createPortfolioMasterData, { headers: headers });
        } else {
            return this.http.post(this.commonService.rootData.rootUrl + 'portfolios', createPortfolioMasterData, { headers: headers });
        }
    }

    getPortfolioMaster() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'portfolios', { headers: headers });
    }

    getPortfolioMasterId(params: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'portfolio/' + params._id, {headers: headers});
    }

    statusPortfolio(updatestatusData: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.patch(this.commonService.rootData.rootUrl + 'portfolio/' + updatestatusData._id + '/status', updatestatusData, { headers: headers });
    }

     //testimoniall API

     getTestimonialMaster() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'testimonials', { headers: headers });
    }

    saveTestimonialMaster(createTestimonialMasterData: any, id) {
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        if (id) {
            return this.http.put(this.commonService.rootData.rootUrl + 'testimonial/' + id, createTestimonialMasterData, { headers: headers });
        } else {
            return this.http.post(this.commonService.rootData.rootUrl + 'testimonials', createTestimonialMasterData, { headers: headers });
        }
    }

    getTestimonialMasterId(params: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'testimonial/' + params._id, {headers: headers});
    }

    statusTestimonial(updatestatusData: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.patch(this.commonService.rootData.rootUrl + 'testimonial/' + updatestatusData._id + '/status', updatestatusData, { headers: headers });
    }
}