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
      this.doughnutChartData   = this.AppData.doughnutChartData;
      this.doughnutChartLabels = this.AppData.doughnutChartLabels;
      this.lineChartData       = this.AppData.lineChartData;
      this.randomizeType();
  }

   public doughnutChartType:string = 'doughnut';
   public lineChartData:Array<any> = [];
   public doughnutChartData:number[] = [];
   public doughnutChartLabels:Array<any> = [];
   public doughnutOptions:any = { responsive: true };

   //mini
   public miniData:Array<any> = [1,1,1,1];
   public miniLabel:Array<any> = ['1','2','3','4'];
   public miniLegenda:string = '*Bairros com mais casos';
   //mini
   public miniData1:Array<any> = [1,1,1,1];
   public miniLabel1:Array<any> = ['1','2','3','4'];
   public miniLegenda1:string = '*Meses com mais casos';

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
     this.AppService.jsonR(de,ate).subscribe((response: Response) => this.proccess(response.json()));
     this.AppService.list(de,ate,'bairro','3').subscribe((response: Response) => this.proccessB(response.json()));
     this.AppService.list(de,ate,'mes','3').subscribe((response: Response) => this.proccessC(response.json()));
   }
   public proccess(e:any):void {
     //this.json = e;
     this.gifs = [];
     this.json = [];
     for(let i in e){
       this.gifs.push(e[i].casos);
       this.json.push({data: [e[i].casos], label: e[i].doenca});
     }
     //console.log(this.label,this.AppData.lineChartLabelsBairro);
     //this.doughnutChartLabels = this.label;//this.AppData.lineChartLabelsBairro;
     this.doughnutChartData   = this.gifs;
   }
   public proccessB(e:any):void {
     this.miniData = [];
     this.miniLabel= [];
     for(let i in e){
         this.miniData.push(e[i].casos);
         this.miniLabel.push(e[i].doenca);
     }
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

}
