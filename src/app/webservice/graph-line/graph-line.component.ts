declare var google: any;
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-graph-line',
  templateUrl: './graph-line.component.html',
  styleUrls: ['./graph-line.component.css']
})
export class GraphLineComponent implements OnInit {

  @Input()
  miniData:Array<any> = [1,1,1,1];
  @Input()
  miniLabel:Array<any> = ['1','2','3','4'];
  @Input()
  miniLegenda:string = '*Nº de casos por doença';
  @Input()
  miniName:string =  'x1';
  @Output()
    uploaded:EventEmitter<string> = new EventEmitter();

  public dataChart:any;
  public localchart:any;

  constructor() { }

  ngOnInit() {

  }
  uploadComplete(call:boolean) {
    this.uploaded.emit((call)?'ok':'no');
  }

  public open(){
    google.charts.load('current', {'packages':['corechart', 'controls']});
    google.charts.setOnLoadCallback(()=>{
       this.rosca();
    });
  }
  rosca() {
      //console.log('rosca',this.miniLabel,this.miniData);
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
      //
      google.visualization.events.addListener(this.localchart, 'select', (a,b,c)=> {
        var selectedItem = this.localchart.getSelection()[0];
        this.localchart.setSelection(selectedItem);
        if (selectedItem) {
          try{
            var topping = this.dataChart.getValue(selectedItem.row, 0);
            console.log('The user selected ' + topping);
            if(topping == 'Sífilis'){
                this.uploadComplete(true);
            }else{
              this.uploadComplete(false);
            }
          }catch(e){

          }
        }
      });
  }


}
