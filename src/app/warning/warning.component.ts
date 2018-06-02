declare var require: any;
declare var io: any;
declare var google: any;
var configuration = require('../../configuration');

import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css'],
  //directives: [ FilterListComponent ]
})
export class WarningComponent implements OnInit {
  public ndx:any;
  public filterAll:any;
  //
  public list:any[] = [];
  public socket:any;
  public result_s:any;

  constructor(private appService : AppService, private route: Router ) { }

  ngOnInit() {
       //console.log(configuration.socket);
      this.socket = io(configuration.socket,{'transports': ['websocket', 'polling']});
      this.socket.on('connect', function(){ console.log('connect');  });
      this.socket.on('event', function(data){ console.log('event'); });
      this.socket.on('disconnect', function(){ console.log('disconnect'); });

      this.socket.on('save', (a) =>{ this.result_s = a; this.getScoreAll(); });
      this.socket.on('getScores', (a) =>{ console.log('getScores',a.length,a); this.full(a); this.list = a; });
      this.socket.on('exam', (a) =>{ this.list = a; });

      if(!this.appService.checkLogin())
        this.route.navigate(['/modelo'])
      else
        setTimeout(()=>{ this.getScoreAll(); },1000);
  }
  ngOnDestroy() {
      this.socket.destroy();
      this.socket = undefined;
  }
  public getScoreAll(){
      this.socket.emit("getScores",{'datatime':1});
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
      this.socket.emit("exam",list);
  }

  public getClass(n:number){
      return (n >= 0.900) ? 'red' : (n >= 0.700) ? 'yellow' : 'green';
  }

  public filter(experiments:any):any{
      let data = [['Data','Variação']];
      experiments.forEach(function(d) {
           let tmp = d.dataEnd.split('T')[0].split('-');
           d.data = tmp[2]+'/'+tmp[1]+'/'+tmp[0];
           data.push([d.data,d.score.item]);
      });
      return data;
  }
  //
  public full(experiments:any){
        experiments.splice(0,(experiments.length-10));
        experiments   = this.filter(experiments);
        var data = new google.visualization.arrayToDataTable(experiments);

        var options = {
          pointSize: 10,
          title: 'Variação',
          curveType: 'function',
          legend: { position: 'bottom' },
          tooltip: {trigger: 'selection'}
        };

        var chart = new google.visualization.LineChart(document.getElementById('timeline'));
        chart.draw(data, options);

  }
}
