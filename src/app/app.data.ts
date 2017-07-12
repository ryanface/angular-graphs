import { Injectable } from '@angular/core';

@Injectable()
export class AppData {

    public lineChartData:any[] = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Chikungunya'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Dengue'},
      {data: [18, 48, 77, 9, 100, 27, 40], label: 'Zika'},
      {data: [18, 48, 77, 9, 100, 27, 40], label: 'Sífilis'}
    ];
    public lineChartLabels:Array<any> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'julho'];
    public lineChartLabelsBairro:any[] = ['Centro','Alvorada','Araras','Autódromo', 'Bela Vista','Belvedere','Boa Vista']
    
    constructor() {
    }
    public randomize():void {
      let _lineChartData:Array<any> = new Array(this.lineChartData.length);
      for (let i = 0; i < this.lineChartData.length; i++) {
        _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
        for (let j = 0; j < this.lineChartData[i].data.length; j++) {
          _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
        }
      }
      this.lineChartData = _lineChartData;
    }
    get(type : string): any[] {
      this.randomize();
      if(type == 'bairro')
        return [{'data':this.lineChartData,'legend':this.lineChartLabelsBairro}];
      else return [{'data':this.lineChartData,'legend':this.lineChartLabels}];
    }
}
