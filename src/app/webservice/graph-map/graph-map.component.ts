declare var google: any;
import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-graph-map',
  templateUrl: './graph-map.component.html',
  styleUrls: ['./graph-map.component.css']
})
export class GraphMapComponent implements OnInit {

  @Input()
  miniData:Array<any> = [1,1,1,1];
  @Input()
  miniLabel:Array<any> = ['1','2','3','4'];
  @Input()
  miniLegenda:string = '*Unidades notificadoras com mais casos';
  @Input()
  miniName:string =  'x2';

  public dataChart:any;
  public localchart:any;
  public dataMap:any;
  public localMap:any;

  constructor() { }

  ngOnInit() {

  }
  public open(){
      google.charts.load('current', { 'packages': ['map'] ,  'mapsApiKey': 'AIzaSyByGRAt324WMsI2hb5MTJhe0ch7QLCBvC0'});
      google.charts.setOnLoadCallback(()=>{
         this.rosca().setMap();
      });
  }
  rosca() {
      this.dataChart = new google.visualization.DataTable();
      this.dataChart.addColumn('string', this.miniLegenda);
      this.dataChart.addColumn('number', 'Número');
      //
      this.localchart = new google.visualization.PieChart(document.getElementById('map_div'));
      //
      let tmp:any = [];
      for(let i in this.miniLabel){
        tmp.push([this.miniLabel[i],parseInt(this.miniData[i])]);
      }
      this.dataChart.addRows(tmp);
      this.localchart.draw(this.dataChart, {'title':this.miniLegenda,'width':600,'height':350});
      //
      google.visualization.events.addListener(this.localchart, 'select', (a,b,c)=> {
        var selectedItem = this.localchart.getSelection()[0];
        //console.log(selectedItem);
        this.localchart.setSelection(selectedItem);
        if (selectedItem) {
            var topping = this.dataChart.getValue(selectedItem.row, 0);
            console.log('The user selected ' + topping);
            this.updateMiniData('Chapecó, '+topping,topping+': 1')
        }
      });
     return this;
  }
  updateMiniData(label:string,data:string){
      //console.log(label);
      var tmp = [['Bairro', 'Doenças'],
          [label, label+':'+data]];
      this.map(tmp);
  }
  setMap(){
    let tmp:any = [];
    for(let i in this.miniLabel){
      tmp.push(['Chapecó, '+this.miniLabel[i],this.miniLabel[i]+' :'+this.miniData[i]]);
    }
    this.map(tmp);
  }
  map(tmp:any = []):any {
    //console.log(tmp);
    this.dataMap = google.visualization.arrayToDataTable(tmp);
    var options = { mapType: 'styledMap',zoomLevel: 13,showTooltip: true,showInfoWindow: true,useMapTypeControl: true  };
    this.localMap = new google.visualization.Map(document.getElementById('chart_div'));
    this.localMap.draw(this.dataMap, options);

    return this;
 }

}
