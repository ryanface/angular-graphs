import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  constructor(private http: Http) {
  }
  json(term: string, limit: string): Observable<Response> {
    const url = 'http://php-newtxt.rhcloud.com/?param1=nome&valor1='+term;
    return this.http.get(url);
  }
}
