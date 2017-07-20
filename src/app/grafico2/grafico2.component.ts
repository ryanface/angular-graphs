import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AppService } from "../app.service";
import { AppData } from "../app.data";
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-grafico2',
  templateUrl: './grafico2.component.html',
  styleUrls: ['./grafico2.component.css']
})
export class Grafico2Component implements OnInit {
  dataDe: DateModel;
  dataAte: DateModel;
  options: DatePickerOptions;
  gifs: any[] = [];
  json: any[] = [];
  label: any[] = [];
  term: string;

  constructor( private AppData : AppData, private AppService: AppService) { }

  ngOnInit() {
     this.radarChartLabels = this.AppData.lineChartLabelsBairro;
     this.radarChartData   = this.AppData.lineChartData;
     this.randomizeType();
  }

  public radarChartLabels:string[] = [];
  public radarChartData:any = [];
  public radarChartType:string = 'radar';

  public randomize():void {
    let tmp = this.AppData.get('bairro');
    this.radarChartData   = tmp[0].data;
    this.radarChartLabels = tmp[0].legend;
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
      this.label = [];
      for(let j in e[i]){
         if(j != 'doenca' && j != 'casos' && j != 'ano'){
            tmp.push(parseInt(e[i][j]));
            this.label.push(j);
         }   
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
    console.log(this.label,this.AppData.lineChartLabelsBairro);
    this.radarChartLabels = this.label;//this.AppData.lineChartLabelsBairro;
    this.radarChartData   = this.gifs;
  }
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
