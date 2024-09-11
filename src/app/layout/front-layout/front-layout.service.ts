import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CommonService } from '../../shared/common.service';

@Injectable({
    providedIn: 'root'
})
export class FrontLayoutService {
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

    getPortfolioList() {
        return this.http.get(this.commonService.rootData.rootUrl + 'activePortfolios');
    }
}