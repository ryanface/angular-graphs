declare var google: any;
import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { AppData } from "../../app.data";

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
  @Input()
  miniMeses1:Array<any> = ['1','2','3','4'];

  public dataChart:any;
  public localchart:any;
  public clicked:any;
  public header:any;
  public DataTable:any;

  constructor( private AppData : AppData ) { }

  ngOnInit() {

  }
  public open(){
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(()=>{
       this.rosca();
    });
  }
  rosca() {
      //console.log('rosca',this.miniLabel,this.miniData);
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
  public open_month(data:any){
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(()=>{
       this.other(data);
    });
  }
  other(data:any){
      let list = data[0].doenca.split(',')
      let header = ['Meses'].concat(list);
        this.header = header;
      let tmp:any =  [header];
      let con:any = [];
      let cov:any = [];
      for(let i in data){
        cov = data[i].casos.split(',');
        for(let j in cov){
           cov[j] = parseInt(cov[j]);
        }
        con = [this.AppData.lineChartLabels[(data[i].mes-1)]].concat(cov);
        tmp.push(con);
      }
      this.DataTable = tmp;
      var data = google.visualization.arrayToDataTable(tmp);
      var options = {
           width: 1200,
           height: 400,
           legend: { position: 'top', maxLines: 2 },
           bar: { groupWidth: '100%' },
           isStacked: true,
           hAxis: { minValue: 0, maxValue: 9 },
           curveType: 'function',
           pointSize: 5,
      };
       //ColumnChart - AreaChart
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(data, options);
        //
        google.visualization.events.addListener(chart, 'select', (a,b,c)=> {
          var selectedItem = chart.getSelection()[0];
          chart.setSelection(selectedItem);
          if (selectedItem) {
            try{
              var topping = data.getValue(selectedItem.row, 0);
              console.log('The user selected ' + topping);
              this.updateMiniData(topping)
            }catch(e){
                this.clicked = [];
            }
          }
        });
    }
    updateMiniData(label:string){
        for(let i in this.DataTable){
          if(this.DataTable[i][0] == label){
             this.clicked = this.DataTable[i];
             this.header[0] = 'Doença';
             console.log(this.clicked);
          }
        }
    }


}
