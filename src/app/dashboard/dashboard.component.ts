declare var require: any;
declare var io: any;
declare var d3: any;
declare var dc: any;
declare var crossfilter: any;
declare var lysenkoIntervalTree: any;
declare var intervalTreeGroup: any;
var configuration = require('../../configuration');

import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  //directives: [ FilterListComponent ]
})
export class DashboardComponent implements OnInit {

  public socket:any;
  public list:any[];
  public ndx:any;
  public filterAll:any;
  public timeline:any;
  public timescore:any;
  public barchart:any;
  public barUnidades:any;
  public composite:any;

  constructor(private appService : AppService, private route: Router ) { }

  ngOnInit() {
      this.socket = io(configuration.socket,{'transports': ['websocket', 'polling']});
      this.socket.on('connect', function(){ console.log('connect');  });
      this.socket.on('event', function(data){ console.log('event'); });
      this.socket.on('disconnect', function(){ console.log('disconnect'); });


      this.socket.on('getCasos', (a) =>{ this.list = a; this.full(a); });
      this.socket.on('getScores', (a,b,c) =>{ this.list = b; this.full(b); console.log('getScores',a,b,c);  });

      if(!this.appService.checkLogin())
        this.route.navigate(['/modelo'])
      else{
        //this.timeline     = dc.barChart("#timeline");
        this.barchart     = dc.pieChart("#barchart");
        this.barUnidades  = dc.rowChart("#barUnidades");

        this.socket.on('MongoDB', (a) =>{ if(a == 'ok') this.get();  });
      }
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
  public get(){
      this.socket.emit("getCasos");
      //this.socket.emit("getScores");
  }
  public filter(experiments:any):any{
      experiments.forEach(function(d) {
           let tmp = d.dataRegistro.split(' ')[0].split('/');
           d.dataRegistro = tmp[2]+'/'+tmp[1]+'/'+tmp[0];
           d.month       = new Date(d.dataRegistro).getMonth();
           d.year        = new Date(d.dataRegistro).getFullYear();
           d.open        = d.dataRegistro;

           d.min    = new Date(new Date(d.dataRegistro).getTime());
           d.max    = new Date(new Date(d.dataRegistro).getTime());
           d.interval = [new Date(d.dataRegistro).getTime(),new Date(d.dataRegistro).getTime()];
           //sum

      });
      return experiments;
  }
  //
  public full(experiments:any){
      experiments   = this.filter(experiments);
      console.log('experiments',experiments[0])
      this.ndx = crossfilter(experiments);
      this.filterAll = this.ndx.groupAll();
      var firstDate = d3.min(experiments, function(x) { return (x != NaN) ? x['min'] :0; }),
          lastDate  = d3.max(experiments, function(x) { return (x != NaN) ? x['max'] :0; });
      //console.log(firstDate,lastDate,'experiments',experiments);
      //TIMELINE ------------------------------------------------------
      var intervalDimension    = this.ndx.dimension(function(d) {return d.interval;});
      var projectsPerMonthTree = this.ndx.groupAll().reduce(
          function(v, d) {
              v.insert(d.interval);
              return v;
          },
          function(v, d) {
             try{
              v.remove(d.interval);
             }catch(e){
             }
              return v;
          },
          function() {
              return lysenkoIntervalTree(null);
          }
      );

      var projectsPerMonthGroup = intervalTreeGroup(projectsPerMonthTree.value(), firstDate, lastDate);
      //console.log(projectsPerMonthGroup)
      var hits = intervalDimension.group().reduceSum(dc.pluck('month'));
     //console.log(dateDim)
     //MULT------------------------------------------------------

         var composite = dc.compositeChart(d3.select('#timeline'));
         composite
             .width(1000)
             .height(300)
             .x(d3.scaleTime())
             .y(d3.scaleLinear().domain([0,200]))
             .renderHorizontalGridLines(true)
             .xUnits(d3.timeMonths)
             .elasticX(true)
             .brushOn(true)
             .yAxisLabel("Número de Casos")
             .xAxisLabel("Meses")
             .compose([
               dc.lineChart(composite)
                   .width(1000)
                   .height(300)
                   .ordinalColors(['blue','orange'])
                   .renderLabel(true)
                   .dimension(intervalDimension)
                   .group(projectsPerMonthGroup),
               dc.lineChart(composite)
                   .width(1000)
                   .height(300)
                   .ordinalColors(['green','blue','orange'])
                   .renderLabel(true)
                   .dimension(intervalDimension)
                   .group(projectsPerMonthGroup),
               dc.barChart(composite)
                      .width(1000)
                      .height(300)
                      .elasticX(true)
                      .ordinalColors(['red','green','blue','orange'])
                      .brushOn(true)
                      .yAxisLabel("Número de Casos")
                      .xAxisLabel("Meses")
                      .renderLabel(true)
                      .dimension(intervalDimension)
                      .group(projectsPerMonthGroup)
                      .controlsUseVisibility(true)
                      .filterHandler(function(dim, filters) {
                                  if(filters && filters.length) {
                                      if(filters.length !== 1)
                                          throw new Error('not expecting more than one range filter');
                                      var range = filters[0];
                                      dim.filterFunction(function(i) {
                                          return !(i[1] < range[0].getTime() || i[0] > range[1].getTime());
                                      })
                                  }
                                  else dim.filterAll();
                                  return filters;
                           })
             ])

//----------------------------------------------
var data = [
   {date: "12/27/2012", http_404: 2, http_200: 190, http_302: 100,total:0},
   {date: "12/28/2012", http_404: 2, http_200: 10, http_302: 100,total:0},
   {date: "12/29/2012", http_404: 1, http_200: 300, http_302: 200,total:0},
   {date: "12/30/2012", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "12/31/2012", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/01/2013", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/02/2013", http_404: 1, http_200: 10, http_302: 1,total:0},
   {date: "01/03/2013", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/04/2013", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/05/2013", http_404: 2, http_200: 90, http_302: 0,total:0},
   {date: "01/06/2013", http_404: 2, http_200: 200, http_302: 1,total:0},
   {date: "01/07/2013", http_404: 1, http_200: 200, http_302: 100,total:0}
   ];
    var ndx = crossfilter(data);
    var parseDate = d3.timeParse("%m/%d/%Y");

    data.forEach(function(d) {
     d.date = parseDate(d.date);
     d.total= d.http_404+d.http_200+d.http_302;
    });
    console.log(data);

    var compositex = dc.compositeChart(d3.select('#barMulta'));
    var dateDim = ndx.dimension(function(d) {return d.date;});
    var hits = dateDim.group().reduceSum(dc.pluck('total'));
    var minDate = dateDim.bottom(1)[0].total;
    var maxDate = dateDim.top(1)[0].total;
    //console.log(minDate,maxDate);


    compositex
        .width(1000)
        .height(300)
        .x(d3.scaleTime())
        .y(d3.scaleLinear().domain([0,500]))
        .renderHorizontalGridLines(true)
        .xUnits(d3.timeMonths)
        .elasticX(true)
        .brushOn(true)
        .yAxisLabel("Número de Casos")
        .xAxisLabel("Meses")
        .compose([
          dc.lineChart(compositex)
              .width(1000)
              .height(300)
              .renderLabel(true)
              .dimension(dateDim)
              .group(hits),
          dc.lineChart(compositex)
              .width(1000)
              .height(300)
              .renderLabel(true)
              .dimension(dateDim)
              .group(hits)
        ])
//----------------------------------------------
     //BAR UNIDADES------------------------------------------------------
     var barUnidadesDimension = this.ndx.dimension(function (d) {
         return d.unidade;
     });
     var barUnidadesGroup = barUnidadesDimension.group().reduceSum(function (d) {
         return +1;//d.idUnidade;
     });
      this.barUnidades
          .width(400)
          .height(300)
          .renderLabel(true)
          .dimension(barUnidadesDimension)
          .ordinalColors(['red','green','blue','orange'])
          .group(barUnidadesGroup)
          .turnOnControls(true)
          .legend(dc.legend());
    //BAR DOENCAS ------------------------------------------------------
     var barchartDimension = this.ndx.dimension(function (d) {
         return d.doenca;
     });
     var barchartGroup = barchartDimension.group().reduceSum(function (d) {
         return +1;//d.idUnidade;
     });
     this.barchart
         .width(400)
         .height(350)
         .slicesCap(10)
         .innerRadius(100)
         .externalLabels(50)
         .externalRadiusPadding(100)
         .ordinalColors(['red','green','blue','orange'])
         .drawPaths(true)
         .dimension(barchartDimension)
         .group(barchartGroup)
         .legend(dc.legend());



      dc.renderAll();
  }

}
