import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AppService } from "../app.service";
import { AppData } from "../app.data";

@Component({
  selector: 'app-grafico3',
  templateUrl: './grafico3.component.html',
  styleUrls: ['./grafico3.component.css']
})
export class Grafico3Component implements OnInit {

  gifs: any[] = [];
  term: string;
  public barChartOptions:any = {scaleShowVerticalLines: true,responsive: true};
  public barChartLabels:string[] = [];
  public barChartType:string     = 'line';
  public barChartLegend:boolean  = true;
  public lineChartOptions:any = {scaleShowVerticalLines: true,responsive: true};
  public lineChartLabels:string[] = [];
  public lineChartType:string     = 'line';
  public lineChartLegend:boolean  = true;
  public lineChartData:any[] = [];
  public barChartData:any[]  = [];

  constructor( private AppService : AppService, private AppData : AppData ) { }

  ngOnInit() {
     this.randomize();
  }

  public randomize():void {
    let tmp = this.AppData.get('mes');
    this.lineChartData   = tmp[0].data;
    this.lineChartLabels = tmp[0].legend;
    this.barChartData    = tmp[0].data;
    this.barChartLabels  = tmp[0].legend;
  }
  public randomizeType(chart:string):void {
    //this.AppService.json(term,'').subscribe((response: Response) => this.gifs = response.json());
    this.barChartType   = chart;
    this.lineChartType  = chart;
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
