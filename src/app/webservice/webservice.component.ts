declare var google: any;
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { WebserviceService } from "./webservice.service";
import { AppService } from "../app.service";
import { AppData } from "../app.data";
import { DatePickerOptions, DateModel } from 'ng2-datepicker';


@Component({
  selector: 'app-webservice',
  templateUrl: './webservice.component.html',
  styleUrls: ['./webservice.component.css']
})
export class WebserviceComponent implements OnInit {
  dataDe: DateModel;
  dataAte: DateModel;
  options: DatePickerOptions;
  gifs: any[] = [];
  json: any[] = [];
  label: any[] = [];
  term: string;

  constructor( private WebserviceService : WebserviceService, private AppData : AppData, private AppService: AppService) { }

  ngOnInit() {
      this.randomizeType();
  }
  ngOnDestroy() {

  }
   //master
   public masterData:Array<any> = [1,1,1,1];
   public masterLabel:Array<any> = ['1','2','3','4'];
   public masterLegenda:string =  '*Nº de casos por doença';
   public masterName:string =  'x1';
   //mini
   public miniData:Array<any> = [1,1,1,1];
   public miniLabel:Array<any> = ['1','2','3','4'];
   public miniLegenda:string = '*Unidades notificadoras com mais casos';
   public miniName:string =  'x2';
   //mini
   public miniData1:Array<any> = [1,1,1,1];
   public miniLabel1:Array<any> = ['1','2','3','4'];
   public miniLegenda1:string = '*Meses com mais casos';
   public miniName1:string =  'x3';
   //----
   public type:string = 'doughnut';  //'line';//

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
     this.AppService.jsonR(de,ate).subscribe((response: Response) => this.proccessA(response.json()));
     this.AppService.list(de,ate,'bairro','10').subscribe((response: Response) => this.proccessB(response.json()));
     this.AppService.list(de,ate,'mes','10').subscribe((response: Response) => this.proccessC(response.json()));
   }
   public proccessA(e:any):void {
     this.json = [];
     //
     this.masterData = [];
     this.masterLabel= [];
     for(let i in e){
         this.masterData.push(e[i].casos);
         this.masterLabel.push(e[i].doenca);
         //
         this.json.push({data: [e[i].casos], label: e[i].doenca});
     }
   }
   public proccessB(e:any):void {
     this.miniData = [];
     this.miniLabel= [];
     for(let i in e){
         this.miniData.push(e[i].casos);
         this.miniLabel.push(e[i].doenca);
     }
     this.map();
   }
   public proccessC(e:any):void {
     this.miniData1 = [];
     this.miniLabel1= [];
     for(let i in e){
         this.miniData1.push(e[i].casos);
         this.miniLabel1.push(this.AppData.lineChartLabels[(e[i].doenca-1)]);
     }
   }
   public chartClicked(e:any):void {
     console.log(e);
   }

   public chartHovered(e:any):void {
     console.log(e);
   }

   public map(){
       google.charts.load('current', { 'packages': ['map'] ,  'mapsApiKey': 'AIzaSyByGRAt324WMsI2hb5MTJhe0ch7QLCBvC0'});
       google.charts.setOnLoadCallback(()=>{this.drawMap()});
   }
   drawMap() {
       console.log(this.miniLabel);
       let tmp:any = [];
       for(let i in this.miniLabel){
         tmp.push(['Chapecó, '+this.miniLabel[i],this.miniLabel[i]+' :'+this.miniData[i]]);
       }
       var data = google.visualization.arrayToDataTable(tmp);
       var options = { mapType: 'styledMap',zoomLevel: 13,showTooltip: true,showInfoWindow: true,useMapTypeControl: true  };
       var map = new google.visualization.Map(document.getElementById('chart_div'));

     map.draw(data, options);
   }
}
