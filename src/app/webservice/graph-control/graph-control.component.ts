declare var google: any;
import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-graph-control',
  templateUrl: './graph-control.component.html',
  styleUrls: ['./graph-control.component.css']
})
export class GraphControlComponent implements OnInit {

  @Input()
  miniData:Array<any> = [1,1,1,1];
  @Input()
  miniLabel:Array<any> = ['1','2','3','4'];
  @Input()
  miniLegenda:string = '*Nº de casos por doença';
  @Input()
  miniName:string =  'x1';

  public dataChart:any;
  public localchart:any;

  constructor() { }

  ngOnInit() {

  }
  public open(){
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(()=>{
       this.rosca().other();
    });
  }
  rosca() {
      console.log('rosca',this.miniLabel,this.miniData);
      //
      this.dataChart = new google.visualization.DataTable();
      this.dataChart.addColumn('string', this.miniLegenda);
      this.dataChart.addColumn('number', 'Número');
      //
      this.localchart = new google.visualization.PieChart(document.getElementById(this.miniName));
      //
      let tmp:any = [];
      for(let i in this.miniLabel){
        tmp.push([this.miniLabel[i],parseInt(this.miniData[i])]);
      }
      this.dataChart.addRows(tmp);
      this.localchart.draw(this.dataChart, {'title':this.miniLegenda,'width':600,'height':350});

     return this;
  }
  other(){
      var data = google.visualization.arrayToDataTable([
           ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
            'Western', 'Literature', { role: 'annotation' } ],
           ['2010', 10, 24, 20, 32, 18, 5, ''],
           ['2020', 16, 22, 23, 30, 16, 9, ''],
           ['2030', 28, 19, 29, 30, 12, 13, '']
         ]);

         var options = {
           width: 600,
           height: 400,
           legend: { position: 'top', maxLines: 3 },
           bar: { groupWidth: '75%' },
           isStacked: true,
         };
          var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
          chart.draw(data, options);
  }


}
