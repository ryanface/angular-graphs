import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { WebserviceService } from "./webservice.service";


@Component({
  selector: 'app-webservice',
  templateUrl: './webservice.component.html',
  styleUrls: ['./webservice.component.css']
})
export class WebserviceComponent implements OnInit {

  constructor( private WebserviceService : WebserviceService) { }

  ngOnInit() {
      this.randomize();
  }

   public doughnutChartType:string = 'doughnut';
   public lineChartData:Array<any> = [
     {data: [65], label: 'Chikungunya'},
     {data: [28], label: 'Dengue'},
     {data: [18], label: 'Zika'},
     {data: [18], label: 'Sífilis'}
   ];
   public doughnutChartData:number[] = [350, 450, 100, 350];
   public doughnutChartLabels:Array<any> = ['Chikungunya', 'Dengue', 'Zika', 'Sífilis'];
   public doughnutOptions:any = { responsive: true };


   public randomize():void {
     let _lineChartData:Array<any> = new Array(this.lineChartData.length);
     let _doughnutChartData:Array<any> = new Array(this.doughnutChartData.length);
     for (let i = 0; i < this.lineChartData.length; i++) {
       _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
       for (let j = 0; j < this.lineChartData[i].data.length; j++) {
         _lineChartData[i].data[j] = Math.floor((Math.random() * 600) + 1);
         _doughnutChartData[i] = _lineChartData[i].data[j];
       }
     }
     // grafico
     this.doughnutChartData = _doughnutChartData;
     // quadro
     this.lineChartData = _lineChartData;
   }

}
