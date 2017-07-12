import { Component, OnInit } from '@angular/core';
import { AppData } from "../app.data";

@Component({
  selector: 'app-grafico2',
  templateUrl: './grafico2.component.html',
  styleUrls: ['./grafico2.component.css']
})
export class Grafico2Component implements OnInit {

  constructor( private AppData : AppData) { }

  ngOnInit() {
     this.randomize();
  }

  public radarChartLabels:string[] = [];
  public radarChartData:any = [];
  public radarChartType:string = 'radar';

  public randomize():void {
    let tmp = this.AppData.get('bairro');
    this.radarChartData   = tmp[0].data;
    this.radarChartLabels = tmp[0].legend;
  }

}
