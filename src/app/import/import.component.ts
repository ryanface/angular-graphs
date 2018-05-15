declare var io: any;
declare var d3: any;
declare var dc: any;
declare var full: any;
declare var crossfilter: any;
declare var queue: any;

import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
  //directives: [ FilterListComponent ]
})
export class ImportComponent implements OnInit {

  public list:any[];
  public term:string = "'Página1'!A1:D5";
  public socket:any;

  constructor(private appService : AppService ) { }

  ngOnInit() {
    this.socket = io('http://www:4100',{'transports': ['websocket', 'polling']});
    this.socket.on('connect', function(){ console.log('connect');  });
    this.socket.on('event', function(data){ console.log('event'); });
    this.socket.on('disconnect', function(){ console.log('disconnect'); });
    this.socket.on('html', (a) =>{ this.result(a);  });
  }

  public Loadx(){
    var tmp = {'Load':this.term,'major':'ROWS'};
    console.log('Load',tmp);
    this.socket.emit("open_connect",tmp);
  }
  public result(a:any){
      console.log(a);
      this.list = a.values;
      this.data(this.list);
  }
  //
  public get(){
     this.full();
  }
  public data(experiments){
      experiments.splice(0,1);
      console.log('experiments',experiments);
      var chart2    = dc.rowChart("#test2");
      var ndx = crossfilter(experiments);
      var chart2Dimension = ndx.dimension(function (d) {
          return d[0];
      });
      var chart2Group = chart2Dimension.group().reduceSum(function (d) {
          return d[2];
      });
      chart2
          .width(500)
          .height(200)
          .dimension(chart2Dimension)
          .group(chart2Group);
          //.legend(dc.legend());
      console.log(chart2Group);
      dc.renderAll();
  }
  public full(){
    var chart2    = dc.rowChart("#test2");
    d3.json('http://localhost:8102/api/caso/all').then(function(experiments) {
        //experiments = experiments.slice(0, 5);
        console.log('experiments',experiments);
        var ndx = crossfilter(experiments);
        var chart2Dimension = ndx.dimension(function (d) {
            return d.CS_SEXO;
        });
        var chart2Group = chart2Dimension.group().reduceSum(function (d) {
            return d.NU_ANO;
        });
        chart2
            .width(500)
            .height(200)
            .dimension(chart2Dimension)
            .group(chart2Group);
            //.legend(dc.legend());
        dc.renderAll();
    });

  }

}
