import { Injectable } from '@angular/core';

@Injectable()
export class AppData {

    public lineChartData:any[] = [
      {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Chikungunya'},
      {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Dengue'},
      {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Zika'},
      {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Sífilis'}
    ];
    public lineChartLabels:Array<any> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    public lineChartLabelsBairro:any[] = ['Alvorada','Araras','Autódromo','Bela Vista','Belvedere','Boa Vista','Bom Pastor','Bom Retiro','Campestre','Centro','Cristo Rei','Desbravador','Dom Gerônimo','Dom Pascoal','Efapi','Eldorado','Engenho Braun','Esplanada','Fronteira Sul','Industrial','Jardim América','Jardim Europa','Jardim Itália','Jardins','Lajeado','Líder','Maria Goretti','Monte Belo','Palmital','Paraíso','Parque das Palmeiras','Passo dos Fortes','Pinheirinho','Presidente Médici','Progresso','Quedas do Palmital','SAIC','Santa Maria','Santa Paulina','Santo Antônio','Santos Dummond','São Cristóvão','São Lucas','São Pedro','Seminário','Trevo','Universitário','Vila Real','Vila Rica'];

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
