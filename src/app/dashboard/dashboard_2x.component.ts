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
      this.socket.on('getScores', (a,b,c) =>{ this.list = b; this.full(b);  });

      if(!this.appService.checkLogin())
        this.route.navigate(['/modelo'])
      else{
        //this.timeline     = dc.barChart("#timeline");
        this.barchart     = dc.pieChart("#barchart");
        //this.barUnidades  = dc.rowChart("#barUnidades");

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
      //this.socket.emit("getCasos");
      this.socket.emit("getScores");
  }
  public filter(experiments:any):any{
      var experiment:any = [];
      experiments.forEach(function(d) {
          if(d.list){
            if(d.list.length >= 7){
                 let tmp = d.data.split('T')[0].split('-');
                 d.dataRegistro = tmp[2]+'/'+tmp[1]+'/'+tmp[0];
                 d.month       = new Date(d.data).getMonth();
                 d.year        = new Date(d.data).getFullYear();
                 d.open        = d.dataRegistro;
                 d.min         = new Date(new Date(d.data).getTime());
                 d.max         = new Date(new Date(d.data).getTime());
                 d.interval = [new Date(d.data).getTime(),new Date(d.data).getTime()];
                 //sum
                 //d.dengue = d.doenca == 'Dengue' ? 1 : 0;
                 //let tmp2 = (d.doenca == 'Zika vírus') ? 'Zika' : d.doenca;

                 d.Dengue      = (d.doenca == 'Dengue') ? d.sum : 0;
                 d.Chikungunya = (d.doenca == 'Chikungunya') ? d.sum : 0;
                 d.Zika        = (d.doenca == 'Zika vírus') ? d.sum : 0;
                 d.Sifilis     = (d.doenca == 'Sífilis') ? d.sum : 0;
                 experiment.push(d);
            }
        }
      });
      return experiment;
  }
  //
  public full(experiments:any){
      experiments   = this.filter(experiments);
      console.log('experiments',experiments)
      this.ndx = crossfilter(experiments);


      //TIMELINE ------------------------------------------------------
/*
this.filterAll = this.ndx.groupAll();
var firstDate = d3.min(experiments, function(x) { return (x != NaN) ? x['min'] :0; }),
    lastDate  = d3.max(experiments, function(x) { return (x != NaN) ? x['max'] :0; });
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
*/
//----------------------------------------------
var func = (a,b,c) => {
      console.log('a,b,c',a,b,c) ;
}

    var dateDim         = this.ndx.dimension(function(d) {return +d.max;});
    //var hits            = dateDim.group().reduceSum(dc.pluck('sum'));

    var Dengue          = dateDim.group().reduceSum(dc.pluck('Dengue'));
    var Chikungunya     = dateDim.group().reduceSum(dc.pluck('Chikungunya'));
    var Zika            = dateDim.group().reduceSum(dc.pluck('Zika'));
    var Sifilis         = dateDim.group().reduceSum(dc.pluck('Sifilis'));

    /*
    var dateDengue = this.ndx.dimension(function(d) {return [d.max, d.doenca];});
    var doenca = dateDengue.group(func).reduceSum(dc.pluck('sum'));
    */

    var compositeTwo = dc.compositeChart(d3.select('#barMulta'));
    compositeTwo
        .width(1000)
        .height(300)
        //.x(d3.scaleTime())
        .y(d3.scaleLinear().domain([0,20]))
        .x(d3.scaleTime().domain([new Date(2000, 0, 1), new Date(2020, 11, 31)]))
        .renderHorizontalGridLines(true)
        .xUnits(d3.timeMonths)
        .elasticX(true)
        .brushOn(true)
        .yAxisLabel("Número de Casos")
        .xAxisLabel("Meses")
        .compose([
          /*dc.lineChart(compositeTwo)
              .width(1000)
              .height(300)
              .ordinalColors(['red'])
              .renderHorizontalGridLines(true)
              .renderLabel(true)
              .dimension(dateDim)
              .group(hits,"Todos")
              .dashStyle([10,10]),  /*pontilhado*/
          dc.lineChart(compositeTwo)
              .width(1000)
              .height(300)
              .ordinalColors(['red','green','blue','black'])
              .renderArea(true)
              .dimension(dateDim)
              .group(Dengue,"Dengue"),
              //.stack(Chikungunya,"Chikungunya")
              //.stack(Sifilis,"Sífilis")

          dc.lineChart(compositeTwo)
              .width(1000)
              .height(300)
              .ordinalColors(['red'])
              .renderHorizontalGridLines(true)
              .renderLabel(true)
              .dimension(dateDim)
              .group(Chikungunya,"Chikungunya"),
          dc.lineChart(compositeTwo)
              .width(1000)
              .height(300)
              .ordinalColors(['blue'])
              .renderHorizontalGridLines(true)
              .renderLabel(true)
              .dimension(dateDim)
              .group(Zika,"Zika"),
          dc.lineChart(compositeTwo)
              .width(1000)
              .height(300)
              .ordinalColors(['black'])
              .renderHorizontalGridLines(true)
              .renderLabel(true)
              .dimension(dateDim)
              .group(Sifilis,"Sífilis"),
          dc.barChart(compositeTwo)
                 .width(1000)
                 .height(300)
                 .elasticX(true)
                 .ordinalColors(['orange'])
                 .brushOn(true)
                 .yAxisLabel("Número de Casos")
                 .xAxisLabel("Meses")
                 .renderLabel(true)
                 .dimension(dateDim)
                 .group(Sifilis)
                 .controlsUseVisibility(true)
                 .renderLabel(true)
        ])




//----------------------------------------------
    //BAR DOENCAS ------------------------------------------------------
     var barchartDimension = this.ndx.dimension(function (d) {
         return d.doenca;
     });
     var barchartGroup = barchartDimension.group().reduceSum(function (d) {
         return +d.sum;
     });
     this.barchart
         .width(400)
         .height(350)
         .slicesCap(10)
         .innerRadius(100)
         .externalLabels(50)
         .externalRadiusPadding(100)
         .ordinalColors(['red','green','blue','black'])
         .drawPaths(true)
         .dimension(barchartDimension)
         .group(barchartGroup)
         .legend(dc.legend());



      dc.renderAll();
  }

}
