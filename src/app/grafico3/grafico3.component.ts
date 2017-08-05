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

  public lineChartOptions:any = {
    responsive: true,
    //maintainAspectRatio: false,
    showLines:true,
    //spanGaps:false,
    elements: { line: { tension: 0, } },
    fill: false,//suavizar bordas
    tooltips: {enabled : true},
  };
  public lineChartLabels:string[] = [];
  public lineChartType:string     = 'line';
  public lineChartLegend:boolean  = true;
  public lineChartData:any[] = [];

  //mini
  public miniData:Array<any> = [1,1,1,1];
  public miniLabel:Array<any> = ['1','2','3','4'];
  public miniLegenda:string = '*Meses com mais casos (em %)';
  public miniRows:string = '10';

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
    this.AppService.list(de,ate,'mes','12').subscribe((response: Response) => this.proccessB(response.json()));
  }
  public go_totais(e:any):any{
      //console.log(e);
      let tmp = [];
      for(let i in e){
        for(let j in e[i]){
          if(j != 'doenca' && j != 'casos' && j != 'ano'){
               if(tmp[j] == undefined || tmp[j] == 'NaN') tmp[j] = 0;
               tmp[j] += parseInt(e[i][j]);
               //console.log(j,parseInt(e[i][j]),tmp[j]);
          }else{
              if(j == 'doenca')
                tmp[j] = 'Total';
              else
                tmp[j] = '';
          }
        }
      }
      //console.log(tmp);
      return tmp;
  }
  public proccess(e:any):void {
    this.json = e;
    this.json.push(this.go_totais(e));

    this.gifs = [];
    let list = [];
    for(let i in e){
      let tmp = [];
      for(let j in e[i]){
         if(j != 'doenca' && j != 'casos' && j != 'ano'){
            tmp.push(parseInt(e[i][j]));
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
    this.lineChartLabels = this.AppData.lineChartLabels;
    this.lineChartData   = this.gifs;
  }

  public proccessB(e:any):void {
    this.miniData = [];
    this.miniLabel= [];
    let miniPer = 0;
    for(let i in e){
        miniPer += parseInt(e[i].casos);
    }
    for(let i in e){
        let calc = (e[i].casos/miniPer)*100;
        this.miniData.push(Math.round(calc));
        //this.miniData.push(e[i].casos)
        this.miniLabel.push(this.AppData.lineChartLabels[(e[i].doenca-1)]);
    }
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
