declare var require: any;
declare var io: any;
declare var google: any;
var configuration = require('../../configuration');

import { Component, OnInit, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { FilterListComponent } from './filter-list/filter-list.component';


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
  //
  public Diseases:any[] = [];

  constructor(private appService : AppService, private route: Router ) { }

  ngOnInit() {
       //console.log(configuration.socket);
      this.socket = io(configuration.socket,{'transports': ['websocket', 'polling']});
      this.socket.on('connect', function(){ console.log('connect');  });
      this.socket.on('event', function(data){ console.log('event'); });
      this.socket.on('disconnect', function(){ console.log('disconnect'); });

      this.socket.on('save', (doenca,b) =>{ this.result_s = b; this.getScoreAll(doenca); });
      this.socket.on('getDiseases', (a) =>{ console.log('getDiseasesAll',a.length,a); this.returnDiseasesAll(a);  });
      this.socket.on('getScores', (disease, scores) =>{ console.log('getScores',scores.length,disease); this.full(disease,scores); this.list = scores; });
      this.socket.on('exam', (a) =>{ this.list = a; });

      if(!this.appService.checkLogin())
        this.route.navigate(['/modelo'])
      else
        setTimeout(()=>{ this.getDiseasesAll(); },1000);
        //setTimeout(()=>{ this.getScoreAll(); },1000);
  }
  ngOnDestroy() {
      this.socket.destroy();
      this.socket = undefined;
  }
  checkLogin(){
     return this.appService.checkLogin();
  }
  checkAdmin(){
     return this.appService.checkAdmin();
  }
  public getDiseasesAll(){
      this.socket.emit("getDiseases",{'datatime':1});
  }
  public returnDiseasesAll(diseases){
      this.Diseases = diseases;
      for(let i in diseases){
        if(diseases[i].doenca != '')
          if(diseases[i].casos > 1)
            this.socket.emit("getScores",diseases[i].doenca,{'datatime':1});
      }
  }

  public getScoreAll(disease="Sarampo"){
      this.socket.emit("getScores",disease,{'datatime':1});
  }
  public proccessAll(disease="Sarampo"){
      this.socket.emit("send",disease);
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

  public filter(disease:any,experiments:any):any{
      let data = [['Data','Variação : '+disease]];
      experiments.forEach(function(d) {
           let tmp = d.dataEnd.split('T')[0].split('-');
           d.data = tmp[2]+'/'+tmp[1]+'/'+tmp[0];
           data.push([d.data,d.score.item]);
      });
      return data;
  }
  //
  public full(disease:any,experiments:any){
        experiments.splice(0,(experiments.length-10));
        experiments   = this.filter(disease,experiments);
        var data = new google.visualization.arrayToDataTable(experiments);
        var options = {
          pointSize: 10,
          title: 'Variação :'+disease,
          curveType: 'function',
          legend: { position: 'bottom' },
          tooltip: {trigger: 'selection'}
        };
        var chart = new google.visualization.LineChart(document.getElementById('timeline'+disease));
        chart.draw(data, options);

  }
}
