import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebserviceService {

  constructor(private http: Http) {
  }
  json(limit: string, term: string): Observable<Response> {
    const url = 'http://www/Driverexcels/json';
    return this.http.get(url);
  }

  load(limit: string, term: string): Observable<Response> {
    const url = this.getUrl(limit, term);
    return this.http.get(url);
  }

  getUrl(limit: string, term: string): string {
    return 'https://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC&limit=' + limit;
  }

}
