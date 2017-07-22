import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  constructor(private http: Http) {
  }
  json(de: string, ate: string): Observable<Response> {
    const url = 'http://php-newtxt.rhcloud.com/?param1=data&valor1=2017&param2=data&valor2='+de+'&param3=data&valor3='+ate; //&param2=doenca&valor2=a
    return this.http.get(url);
  }
  jsonB(de: string, ate: string): Observable<Response> {
    const url = 'http://php-newtxt.rhcloud.com/bairros.php?param1=data&valor1=2017&param2=data&valor2='+de+'&param3=data&valor3='+ate; //&param2=doenca&valor2=a
    return this.http.get(url);
  }
}
