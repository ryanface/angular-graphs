declare var google: any;
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
  doughnutChartData:string[] = [];
  @Input()
  legenda:string = '';
  @Input()
  rows:string = '5';
  @Input()
  namex:string = 'txt1';

  public doughnutChartLegend:boolean = true;
  public doughnutChartType:string = 'doughnut';
  public doughnutChartOptions:any = { responsive: true };

  public graph:any = {};
  public dataChart:any;
  public localchart:any;

  constructor() { }

  ngOnInit() {
    this.graph = setInterval(()=>this.drawChart(),2000);
  }
  ngOnDestroy() {
  }
  drawChart() {
      clearInterval(this.graph);
      //
      this.dataChart = new google.visualization.DataTable();
      this.dataChart.addColumn('string', this.legenda);
      this.dataChart.addColumn('number', 'Número');
      //
      this.localchart = new google.visualization.PieChart(document.getElementById(this.namex));
      google.visualization.events.addListener(this.dataChart, 'select', ()=> {
        console.log(this.dataChart.getSelection()); 
        this.localchart.setSelection(this.dataChart.getSelection());
      });
      let tmp:any = [];
      for(let i in this.doughnutChartLabels){
        tmp.push([this.doughnutChartLabels[i],parseInt(this.doughnutChartData[i])]);
      }
      this.dataChart.addRows(tmp);
      this.localchart.draw(this.dataChart, {'title':this.legenda,'width':500,'height':300});
   }
   selectHandler(self:any){
     console.log(self.dataChart);
       var selectedItem = self.dataChart.getSelection();
       var value        = self.dataChart.getValue(selectedItem.row, 0);
       console.log('selectHandler',selectedItem,value);
   }
}
