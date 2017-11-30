declare var require: any;
declare var io: any;
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

  private host:string = 'http://ec2-54-167-230-31.compute-1.amazonaws.com/php-api/';
  private subject = new Subject<Response>();
  private go = new Subject<Response>();

  /*NEW*/
  public socket:any;
  public callback:any;

  constructor(private http: Http,
              private route: Router,
              private gd:GlobalDataService) {
    this.connectServer();
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

  public connectServer(){
    try{
      console.log('start connect');
      this.socket = io(configuration.host+':'+configuration.port,{'transports': configuration.transports});
      this.socket.on('connect', function(){ console.log('end connect'); });
      this.socket.on('event', function(data){ console.log('event'); });
      this.socket.on('disconnect', function(){ console.log('disconnect'); });

      /*GET server*/
      this.socket.on('queryx', (a)=> { console.log('return',a.length); this.goSend( a ); });
    }catch(e){
       console.log('error',e);
    }
  }
  public disconnectServer(){
      //this.socket.destroy();
      //this.socket = undefined;
  }
  public query(arg:any={}){
    try{
        console.log('send query');
        this.socket.emit("query",arg);
    }catch(e){
        console.log('error',e);
    }
  }
  goSend(message: Response) {
      this.go.next(message);
  }
  goClear() {
      this.go.next();
  }
  goService(): Observable<Response> {
      return this.go.asObservable();
  }  
}
