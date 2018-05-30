declare var io: any;

import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css'],
  //directives: [ FilterListComponent ]
})
export class WarningComponent implements OnInit {

  public list:any[] = [];
  public socket:any;
  public url:string = "http://localhost:8102";
  public proc:any[] = [];

  constructor(private appService : AppService ) { }

  ngOnInit() {
      this.socket = io('http://www:4100',{'transports': ['websocket', 'polling']});
      this.socket.on('connect', function(){ console.log('connect');  });
      this.socket.on('event', function(data){ console.log('event'); });
      this.socket.on('disconnect', function(){ console.log('disconnect'); });

      this.socket.on('net', (a) =>{ console.log(a); this.list.push(a.item); });
      this.socket.on('add', (a) =>{ this.list.push(a); });
      this.socket.on('train', (a) =>{ this.train(a); });

     setTimeout(()=>{this.getAll()},2000);
  }
  ngOnDestroy() {
      this.socket.destroy();
      this.socket = undefined;
  }
  public get(){
        this.getAll();
  }
  public getAll(){
      this.appService.get(this.url+'/api/war/all').subscribe((response: Response)=> {
           this.proc = response.json();
           //console.log('list',this.proc);
           this.proccess();
      });
  }
  public proccess(){
     let data:any[] = [];
     let count = 1;
     let index = 0;
     let item  = new Object();
     for (let i in this.proc){
         if(data[index] == undefined) data[index] = {'score':0,'list':[]};
         item['d'+count] = this.proc[i].casos;
        if(count == 1){
           data[index].datatime = this.proc[i].data;
           data[index].data = new Date(this.proc[i].data);
        }
        //console.log(i,this.proc.length);
        if(count >= 7 || parseInt(i) == (this.proc.length-1)){
           data[index].datatimeEnd = this.proc[i].data;
           data[index].dataEnd = new Date(this.proc[i].data);
           data[index].list = item;
           //
           index++;
           count = 0;
           item  = new Object();
        }
        count++;
     }
     //console.log(data);
     this.socket.emit("send",data);
  }
  public run(){
      let obj = {list:{ d1: 1, d2: 2, d3: 3, d4: 4, d5: 5, d6: 6, d7: 7 }};
      this.socket.emit("net",obj);
  }
  public add(){
      this.socket.emit("add");
  }
  public train(list:any){
      //console.log('train',list);
      this.list = list;
  }
  public getClass(n:number){
      return (n >= 0.900) ? 'red' : '';
  }

}
