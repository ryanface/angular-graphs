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
  public result_s:any;

  constructor(private appService : AppService ) { }

  ngOnInit() {
      this.socket = io('http://www:4100',{'transports': ['websocket', 'polling']});
      this.socket.on('connect', function(){ console.log('connect');  });
      this.socket.on('event', function(data){ console.log('event'); });
      this.socket.on('disconnect', function(){ console.log('disconnect'); });

      this.socket.on('save', (a) =>{ this.result_s = a; this.getScoreAll(); });
      this.socket.on('getScores', (a) =>{ console.log('getScores',a); this.list = a; });

      setTimeout(()=>{ this.getScoreAll(); },1000);
  }
  ngOnDestroy() {
      this.socket.destroy();
      this.socket = undefined;
  }
  public getScoreAll(){
      this.socket.emit("getScores");
  }
  public proccessAll(){
      this.socket.emit("send");
  }
  public proccessOne(){
      let list:any=[];
      list.push({list:{ d1: 1, d2: 2, d3: 3, d4: 4, d5: 5, d6: 6, d7: 7 }});
      list.push({list:{ d1: 1, d2: 2, d3: 3, d4: 4, d5: 5, d6: 4, d7: 3 }});
      list.push({list:{ d1: 1, d2: 2, d3: 3, d4: 4, d5: 3, d6: 2, d7: 2 }});
      list.push({list:{ d1: 1, d2: 2, d3: 3, d4: 2, d5: 1, d6: 0, d7: 1 }});
      this.socket.emit("send");
  }

  public getClass(n:number){
      return (n >= 0.900) ? 'red' : (n >= 0.700) ? 'yellow' : 'green';
  }
}
