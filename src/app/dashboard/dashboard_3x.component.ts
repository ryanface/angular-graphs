declare var require: any;
declare var io: any;
declare var d3: any;
declare var dc: any;
declare var crossfilter: any;
declare var lysenkoIntervalTree: any;
declare var intervalTreeGroup: any;
declare var remove_empty_bins: any;
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
        this.timeline     = dc.barChart("#timeline");
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

           d.Dengue      = (d.doenca == 'Dengue') ? 1 : 0;
           d.Chikungunya = (d.doenca == 'Chikungunya') ? 1 : 0;
           d.Zika        = (d.doenca == 'Zika vírus') ? 1 : 0;
           d.Sifilis     = (d.doenca == 'Sífilis') ? 1 : 0;
           d.all         = 1;
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
      this.timeline
             .width(1000)
             .height(300)
             .x(d3.scaleTime())
             .y(d3.scaleLinear().domain([0,400]))
             .xUnits(d3.timeMonths)
             .gap(5)
             .elasticX(true)
             .brushOn(true)
             .yAxisLabel("Número de Casos")
             .xAxisLabel("Meses")
             .renderLabel(true)
             .dimension(intervalDimension)
             .group(projectsPerMonthGroup)
             .controlsUseVisibility(true);

             this.timeline.filterHandler(function(dim, filters) {
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
            });
//----------------------------------------------

    var dateDim = this.ndx.dimension(function(d) {return d.max;});

    var Dengue    = dateDim.group().reduceSum(dc.pluck('Dengue'));
    var Chikungunya = dateDim.group().reduceSum(dc.pluck('Chikungunya'));
    var Zika      = dateDim.group().reduceSum(dc.pluck('Zika'));
    var Sifilis   = dateDim.group().reduceSum(dc.pluck('Sifilis'));
    var all       = dateDim.group().reduceSum(dc.pluck('all'));
    var score     = dateDim.group().reduceSum(dc.pluck('score'));

    //----
    var scorex     = dateDim.group().reduceSum(dc.pluck('max'));
    var filtered_group = remove_empty_bins(scorex)



    dc.lineChart('#barMulta')
        .width(1000)
        .height(300)
        .x(d3.scaleTime())
        .y(d3.scaleLinear().domain([0,10]))
        .ordinalColors(['red','green','blue','black'])
        .xUnits(d3.timeMonths)
        .elasticX(true)
        .brushOn(false)
        .yAxisLabel("Número de Casos")
        .xAxisLabel("Meses")
        .renderLabel(false)
        .dimension(dateDim)
        //.group(score,"score")
        .group(filtered_group)
        //.stack(Dengue,"Dengue")
        //.stack(Sifilis,"Sífilis")
        //.stack(Zika,"Zika")

/*
    var composite = dc.compositeChart(d3.select('#barMulta'));
    composite
        .width(1000)
        .height(300)
        .x(d3.scaleTime())
        .y(d3.scaleLinear().domain([0,10]))
        .xUnits(d3.timeMonths)
        .elasticX(true)
        .brushOn(false)
        .yAxisLabel("Número de Casos")
        .xAxisLabel("Meses")
        .renderLabel(true)
        .compose([
          dc.lineChart(composite)
              .width(1000)
              .height(300)
              .ordinalColors(['red'])
              .renderLabel(true)
              .dimension(dateDim)
              .group(Dengue),
          dc.lineChart(composite)
              .width(1000)
              .height(300)
              .ordinalColors(['green'])
              .renderLabel(true)
              .dimension(dateDim)
              .group(all)
        ])
*/
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
