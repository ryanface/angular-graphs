declare var require: any;
var configuration = require('../configuration');

import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { GlobalDataService } from './globaldata.service';

@Injectable()
export class AppService {

  private host:string = 'http://localhost:8102/api/all';
  public SOCKET:any

  constructor(private http: Http,
              private route: Router,
              private gd:GlobalDataService) {
  }

  get(url:string): Observable<Response> {
        return this.http.get(url);
  }
  post(url:string, data:any): Observable<Response> {
       let headers = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: headers });
       console.log('post',data);
       return this.http.post(url,data,options);//.map(this.extractData);
  }
  extractData(res: Response) {
      let body = res.json();
      return body || {};
  }


}
