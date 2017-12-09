declare var google: any;
import { Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { WebserviceService } from "./webservice.service";
import { AppService } from "../app.service";
import { AppData } from "../app.data";
import { GraphMapComponent } from './graph-map/graph-map.component';
import { GraphLineComponent } from './graph-line/graph-line.component';
import { GraphControlComponent } from './graph-control/graph-control.component';

@Component({
  selector: 'app-webservice',
  templateUrl: './webservice.component.html',
  styleUrls: ['./webservice.component.css']
})
export class WebserviceComponent implements OnInit {
  @ViewChild(GraphMapComponent) mySon: GraphMapComponent;
  @ViewChild(GraphLineComponent) myLine: GraphLineComponent;
  @ViewChild(GraphControlComponent) myControl: GraphControlComponent;

  constructor( private WebserviceService : WebserviceService, private AppData : AppData, private AppService: AppService) { }

  ngOnInit() {
      this.randomizeType();
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

   public randomizeType():void {
     var de  = '2015-07-09';
     var ate = '2019-07-08';
     this.AppService.jsonR(de,ate).subscribe((response: Response) => this.proccessA(response.json()));
     this.AppService.list(de,ate,'bairro','10').subscribe((response: Response) => this.proccessB(response.json()));
     this.AppService.list(de,ate,'mes','10').subscribe((response: Response) => this.proccessC(response.json()));
   }
   public proccessA(e:any):void {
     this.masterData = [];
     this.masterLabel= [];
     for(let i in e){
         this.masterData.push(e[i].casos);
         this.masterLabel.push(e[i].doenca);
     }
      console.log('open',this.masterData);
     this.myLine.open();
   }
   public proccessB(e:any):void {
     this.miniData = [];
     this.miniLabel= [];
     for(let i in e){
         this.miniData.push(e[i].casos);
         this.miniLabel.push(e[i].doenca);
     }
      this.mySon.open();
   }
   public proccessC(e:any):void {
     this.miniData1 = [];
     this.miniLabel1= [];
     for(let i in e){
         this.miniData1.push(e[i].casos);
         this.miniLabel1.push(this.AppData.lineChartLabels[(e[i].doenca-1)]);
     }
     this.myControl.open();
   }


}
