import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-rosca',
  templateUrl: './rosca.component.html',
  styleUrls: ['./rosca.component.css']
})
export class RoscaComponent implements OnInit {

  @Input()
  doughnutChartLabels:string[] = [];
  @Input()
  doughnutChartData:number[] = [];
  @Input()
  legenda:string = '';
  @Input()
  rows:string = '5';

  public doughnutChartLegend:boolean = true;
  public doughnutChartType:string = 'doughnut';
  public doughnutChartOptions:any = { responsive: true };

  constructor() { }

  ngOnInit() {
    //this.doughnutChartData = [30,20];
    //this.doughnutChartLabels  = ['a','b'];
  }

}
