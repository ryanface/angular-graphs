declare var io: any;
declare var d3: any;
declare var dc: any;
declare var full: any;
declare var crossfilter: any;

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
  public term:string = "'Pag1'!A1:H10";
  public planilha :string = "1rYqJ3orTe09ON-A6HaOXhvhuWdpo4jfPQyYWMVtq10A";//https://docs.google.com/spreadsheets/d/1rYqJ3orTe09ON-A6HaOXhvhuWdpo4jfPQyYWMVtq10A
  public socket:any;
  public orientacao:string = 'ROWS';
  public join:any[] = [];

  public result_s:any;

  constructor(private appService : AppService ) { }

  ngOnInit() {
    this.socket = io('http://www:4100',{'transports': ['websocket', 'polling']});
    this.socket.on('connect', function(){ console.log('connect');  });
    this.socket.on('event', function(data){ console.log('event'); });
    this.socket.on('disconnect', function(){ console.log('disconnect'); });
    this.socket.on('html', (a) =>{ this.result(a);  });
    this.socket.on('save', (a) =>{ this.result_save(a);  });
  }
  ngOnDestroy() {
    this.socket.destroy();
    this.socket = undefined;
  }

  public Loadx(){
    this.join = [];
    this.result_s = '';
    var tmp = {'Plan':this.planilha,'Load':this.term,'major': this.orientacao};//'COLUMNS'};//'ROWS'};
    console.log('Load',tmp);
    this.socket.emit("open_connect",tmp);
  }
  public result(a:any){
      this.list = a.values;
      //this.data(this.list);
  }
  public result_save(a){
      this.result_s = a;
  }
  public selectOrientacao(){
      this.orientacao = (this.orientacao == 'ROWS') ? 'COLUMNS' : 'ROWS';
  }
  public save(){
      this.socket.emit("save",this.list);
  }




  public reload(){
      this.data(this.list);
  }
  public updateCheckedOptions(i:number,val:string, event:any){
      let index = this.join.indexOf(i);
      if (index > -1)
          this.join.splice(index, 1);
      else
          this.join.push(i);
  }
  public data(experiments){
      let sunburst = experiments;
      //experiments.splice(0,1);
      console.log('experiments',experiments);
      var chart2    = dc.pieChart("#test2");
      var chart     = dc.sunburstChart("#test");
      var chart3     = dc.seriesChart("#test3");

      var ndx = crossfilter(experiments);
      //-----------------------------------------------------
      var chart2Dimension = ndx.dimension( (d)=> {
          return d[0];
      });
      var chart2Group = chart2Dimension.group().reduceSum(function (d) {
          return d[1];
      });
      chart2
          .width(500)
          .height(200)
          .dimension(chart2Dimension)
          .group(chart2Group);
          //.legend(dc.legend());
      //-----------------------------------------------------
      var sunburstDimension = ndx.dimension( (d) =>{
          let tmp = [];
          console.log('this.join',this.join);
          if(this.join){
            this.join.forEach(function (eachObj) {
                tmp.push(d[eachObj]);
            });
          }else{
            tmp.push(d[0]);
          }
          //console.log('sunburstDimension',tmp);
          return tmp;
      });//d.NU_NOTIFIC,d.NU_ANO,d.DT_DIAG,d.CS_SEXO,d.DT_TRANSSM
      var sunburstGroup = sunburstDimension.group().reduceSum(function (d) {
          return d[0];
      });
      chart
          .width(1000)
          .height(500)
          .innerRadius(50)
          .dimension(sunburstDimension)
          .group(sunburstGroup);
          //.legend(dc.legend());
      //-----------------------------------------------------
      chart3
        .width(768)
        .height(480)
        .chart(function(c) { return dc.lineChart(c).curve(d3.curveCardinal); })
        .x(d3.scaleLinear().domain([0,20]))
        .brushOn(false)
        .yAxisLabel("Measured Speed km/s")
        .xAxisLabel("Run")
        .clipPadding(10)
        .elasticY(true)
        .dimension(sunburstDimension)
        .group(sunburstGroup)
        .mouseZoomable(true)
        .seriesAccessor(function(d) {return "Expt: " + d.key[0];})
        .keyAccessor(function(d) {return +d.key[1];})
        .valueAccessor(function(d) {return +d.value - 500;})
        .legend(dc.legend().x(350).y(350).itemHeight(13).gap(5).horizontal(1).legendWidth(140).itemWidth(70));
      chart3.yAxis().tickFormat(function(d) {return d3.format(',d')(d+299500);});
      chart3.margins().left += 40;
      //-----------------------------------------------------


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
