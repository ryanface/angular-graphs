declare var io: any;
declare var d3: any;
declare var dc: any;
declare var crossfilter: any;
declare var lysenkoIntervalTree: any;
declare var intervalTreeGroup: any;

import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';

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

  constructor(private appService : AppService ) { }

  ngOnInit() {
      this.socket = io('http://www:4100',{'transports': ['websocket', 'polling']});
      this.socket.on('connect', function(){ console.log('connect');  });
      this.socket.on('event', function(data){ console.log('event'); });
      this.socket.on('disconnect', function(){ console.log('disconnect'); });


      this.socket.on('getCasos', (a) =>{ console.log('getCasos',a); this.list = a; this.full(a); });
      this.socket.on('getScores', (a) =>{ console.log('getScores',a);  });

      this.timeline     = dc.barChart("#timeline");
      this.barchart     = dc.pieChart("#barchart");
      this.barUnidades  = dc.rowChart("#barUnidades");
      setTimeout(()=>{ this.get(); },1000);
  }
  ngOnDestroy() {
      this.socket.destroy();
      this.socket = undefined;
  }  
  public get(){
      this.socket.emit("getCasos");
      this.socket.emit("getScores");
  }
  public filter(experiments:any):any{
      experiments.forEach(function(d) {
           let tmp = d.dataRegistro.split(' ')[0].split('/');
           d.dataRegistro = tmp[2]+'/'+tmp[1]+'/'+tmp[0];
           d.month       = d3.timeMonth(d.dataRegistro).getMonth();
           d.open        = d.dataRegistro;

           d.min    = new Date(new Date(d.dataRegistro).getTime());
           d.max    = new Date(new Date(d.dataRegistro).getTime());
           d.interval = [new Date(d.dataRegistro).getTime(),new Date(d.dataRegistro).getTime()];
      });
      return experiments;
  }
  //
  public full(experiments:any){
      experiments   = this.filter(experiments);

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
             .y(d3.scaleLinear().domain([0,100]))
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
     //BAR UNIDADES------------------------------------------------------
     var barUnidadesDimension = this.ndx.dimension(function (d) {
         return d.unidade;
     });
     var barUnidadesGroup = barUnidadesDimension.group().reduceSum(function (d) {
         return +1;//d.idUnidade;
     });
      this.barUnidades
          .width(400)
          .height(200)
          .renderLabel(true)
          .dimension(barUnidadesDimension)
          .group(barUnidadesGroup)
          .turnOnControls(true);
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
         .drawPaths(true)
         .dimension(barchartDimension)
         .group(barchartGroup)
         .legend(dc.legend());


      dc.renderAll();
  }

}
