import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  private host:string = 'http://ec2-54-167-230-31.compute-1.amazonaws.com/php-api/';
  //private host:string = 'http://192.168.211.128/php/';

  constructor(private http: Http) {
  }
  json(de: string, ate: string): Observable<Response> {
    const url = this.host+'?param1=data&valor1=2017&param2=data&valor2='+de+'&param3=data&valor3='+ate; //&param2=doenca&valor2=a
    return this.http.get(url);
  }
  jsonB(de: string, ate: string): Observable<Response> {
    const url = this.host+'bairros.php?param1=data&valor1=2017&param2=data&valor2='+de+'&param3=data&valor3='+ate; //&param2=doenca&valor2=a
    return this.http.get(url);
  }
  jsonR(de: string, ate: string): Observable<Response> {
    const url = this.host+'rosca.php?param1=data&valor1=2017&param2=data&valor2='+de+'&param3=data&valor3='+ate; //&param2=doenca&valor2=a
    return this.http.get(url);
  }
  list(de: string, ate: string, field: string, limit: string): Observable<Response> {
    if(limit == undefined)limit='3';
    const url = this.host+'list.php?param1=data&valor1=2017&param2=data&valor2='+de+'&param3=data&valor3='+ate+'&param4='+field+'&limit='+limit; //&param2=doenca&valor2=a
    return this.http.get(url);
  }
}
