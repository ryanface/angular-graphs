declare var require: any;
declare var io: any;
declare var d3: any;
declare var dc: any;
declare var crossfilter: any;
declare var lysenkoIntervalTree: any;
declare var intervalTreeGroup: any;
declare var remove_empty_bins: any;
declare var fix_item: any;

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
  public ndxTot:any;
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
      console.log('experiments',experiments[0])
      experiments.forEach(function(d) {
                 let tmp = d.data.split('T')[0].split('-');
                 d.dataRegistro = tmp[2]+'/'+tmp[1]+'/'+tmp[0];
                 d.month       = new Date(d.data).getMonth();
                 d.year        = new Date(d.data).getFullYear();
                 d.open        = d.dataRegistro;
                 d.min         = new Date(new Date(d.data).getTime());
                 d.max         = new Date(new Date(d.data).getTime());
                 d.interval = [new Date(d.data).getTime(),new Date(d.data).getTime()];
                 //sum
                 d.Dengue      = (d.doenca == 'Dengue')      ? d.sum : 0;
                 d.Chikungunya = (d.doenca == 'Chikungunya') ? d.sum : 0;
                 d.Zika        = (d.doenca == 'Zika vírus')  ? d.sum : 0;
                 d.Sifilis     = (d.doenca == 'Sífilis')     ? d.sum : 0;

                 d.log          = (d.score != undefined )     ? (d.score.log) ? d.score.log : 0 : 0;
                 d.item         = (d.score != undefined )     ? d.score.item : 0;
                 experiment.push(d);
      });
      return experiment;
  }
  //
  public full(experiments:any){
      console.log(experiments[0]);
      experiments   = this.filter(experiments);
      this.ndx      = crossfilter(experiments);

      //TIMELINE ------------------------------------------------------
          var intervalDimension  = this.ndx.dimension(function(d) {return +d.max;});
          var filter          = intervalDimension.group().reduceSum(dc.pluck('sum'));
          var filtered        = remove_empty_bins(filter)

          var compositeOne = dc.compositeChart(d3.select("#timeline"));
          compositeOne
              .width(500)
              .height(300)
              .y(d3.scaleLinear().domain([0,50]))
              .x(d3.scaleTime().domain([new Date(2000, 0, 1), new Date(2020, 11, 31)]))
              .renderHorizontalGridLines(true)
              .xUnits(d3.timeDays)
              .elasticX(true)
              .brushOn(true)
              .yAxisLabel("Número de Casos")
              .xAxisLabel("Meses")
              .legend(dc.legend())
              .compose([
                dc.barChart(compositeOne)
                  .renderHorizontalGridLines(true)
                  .xUnits(d3.timeDays)
                  .ordinalColors(['blue'])
                  .gap(1)
                  .elasticX(true)
                  .brushOn(true)
                  .yAxisLabel("Número de Casos")
                  .xAxisLabel("Meses")
                  .renderLabel(true)
                  .dimension(intervalDimension)
                  .group(filtered,"Casos")
                  .controlsUseVisibility(true)
                /*,dc.lineChart(compositeOne)
                    .ordinalColors(['red'])
                    .dimension(intervalDimension)
                    .group(filtered)*/
              ])

  //LOG ------------------------------------------------------
      var scoreDimension  = this.ndx.dimension(function(d) {return +d.max;});

      var filter          = scoreDimension.group().reduceSum(dc.pluck('item'));
      var groupItem        = remove_empty_bins(filter,'item')

      var log             = scoreDimension.group().reduceSum(dc.pluck('log'));
      var groupLog        = remove_empty_bins(log,'log')

      var compositeOne = dc.compositeChart(d3.select("#timelog"));
          compositeOne
          .width(600)
          .height(300)
          .y(d3.scaleLinear().domain([0,2]))
          .x(d3.scaleTime().domain([new Date(2000, 0, 1), new Date(2020, 11, 31)]))
          .renderHorizontalGridLines(true)
          .xUnits(d3.timeDays)
          .elasticX(true)
          .brushOn(true)
          .yAxisLabel("Previsão")
          .xAxisLabel("Meses")
          .legend(dc.legend())
          .compose([
            dc.lineChart(compositeOne)
                .ordinalColors(['red'])
                .dimension(scoreDimension)
                .group(groupLog,"Log"),
            dc.lineChart(compositeOne)
                .ordinalColors(['blue'])
                .dimension(scoreDimension)
                .group(groupItem,"item")
          ])


  //SCORES ------------------------------------------------------
    var dateDim         = this.ndx.dimension(function(d) {return +d.max;});

    var Dengue          = dateDim.group().reduceSum(dc.pluck('Dengue'));
    var filtered_Dengue = remove_empty_bins(Dengue)
    var Chikungunya     = dateDim.group().reduceSum(dc.pluck('Chikungunya'));
    var filtered_Chikungunya = remove_empty_bins(Chikungunya)
    var Zika            = dateDim.group().reduceSum(dc.pluck('Zika'));
    var filtered_Zika   = remove_empty_bins(Zika)
    var Sifilis         = dateDim.group().reduceSum(dc.pluck('Sifilis'));
    var filtered_Sifilis = remove_empty_bins(Sifilis)

    var compositeTwo = dc.compositeChart(d3.select('#barMulta'));
    compositeTwo
        .width(600)
        .height(300)
        //.x(d3.scaleTime())
        .y(d3.scaleLinear().domain([0,50]))
        .x(d3.scaleTime().domain([new Date(2000, 0, 1), new Date(2020, 11, 31)]))
        .renderHorizontalGridLines(true)
        .xUnits(d3.timeDays)
        .elasticX(true)
        .brushOn(true)
        .yAxisLabel("Número de Casos")
        .xAxisLabel("Meses")
        .legend(dc.legend())
        .compose([
          dc.lineChart(compositeTwo)
              .ordinalColors(['red'])
              .dimension(dateDim)
              .group(filtered_Dengue,"Dengue"),
          dc.lineChart(compositeTwo)
              .ordinalColors(['green'])
              .renderHorizontalGridLines(true)
              .dimension(dateDim)
              .group(filtered_Chikungunya,"Chikungunya"),
          dc.lineChart(compositeTwo)
              .ordinalColors(['blue'])
              .dimension(dateDim)
              .group(filtered_Zika,"Zika"),
          dc.lineChart(compositeTwo)
              .ordinalColors(['black'])
              .renderHorizontalGridLines(true)
              .dimension(dateDim)
              .group(filtered_Sifilis,"Sífilis")
        ])

//----------------------------------------------
    //BAR DOENCAS ------------------------------------------------------
     var barchartDimension = this.ndx.dimension(function (d) {
         return d.doenca;
     });
     var barchartGroup    = barchartDimension.group().reduceSum(dc.pluck('sum'));
     var filtered_bar     = remove_empty_bins(barchartGroup)
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
         .group(filtered_bar)
         .legend(dc.legend());

      dc.renderAll();
  }

}
