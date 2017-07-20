import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AppService } from "../app.service";
import { AppData } from "../app.data";
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-grafico3',
  templateUrl: './grafico3.component.html',
  styleUrls: ['./grafico3.component.css']
})
export class Grafico3Component implements OnInit {
  dataDe: DateModel;
  dataAte: DateModel;
  options: DatePickerOptions;
  gifs: any[] = [];
  json: any[] = [];
  term: string;

  public lineChartOptions:any = {scaleShowVerticalLines: true,responsive: true};
  public lineChartLabels:string[] = [];
  public lineChartType:string     = 'line';
  public lineChartLegend:boolean  = true;
  public lineChartData:any[] = [];

  constructor( private AppService : AppService, private AppData : AppData ) {
      this.options = new DatePickerOptions();
  }

  ngOnInit() {
     this.lineChartLabels = this.AppData.lineChartLabels;
     this.lineChartData   = this.AppData.lineChartData;
     this.randomizeType();
  }
  public randomizeType():void {
    try{
      var de  = (this.dataDe.formatted != null) ? this.dataDe.formatted : '2015-07-07';
    } catch (e) {
      var de  = '2015-07-09';
    }
    try{
      var ate = (this.dataAte.formatted != null) ? this.dataAte.formatted : '2019-07-08';
    } catch (e) {
      var ate = '2019-07-08';
    }
    this.AppService.json(de,ate).subscribe((response: Response) => this.proccess(response.json()));
  }
  public proccess(e:any):void {
    this.json = e;
    this.gifs = [];
    let list = [];
    for(let i in e){
      let tmp = [];
      for(let j in e[i]){
         console.log(i, j);
         if(j != 'doenca' && j != 'casos' && j != 'ano')
            tmp.push(parseInt(e[i][j]));
      }
      this.gifs.push({data: tmp, label: e[i].doenca});
      list.push(e[i].doenca);
    }
    //caso retorno null, add default
    for(let i in this.AppData.lineChartData){
        if(list.indexOf(this.AppData.lineChartData[i].label) == -1){
          this.gifs.push({data: this.AppData.lineChartData[i].data, label: this.AppData.lineChartData[i].label});
        }
    }

    this.lineChartLabels = this.AppData.lineChartLabels;
    this.lineChartData   = this.gifs;
  }
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
