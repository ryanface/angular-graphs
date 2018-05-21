import { Injectable } from '@angular/core';

@Injectable()
export class AppData {

    public lineChartData:any[] = [
      {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Chikungunya'},
      {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Dengue'},
      {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Zika'},
      {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Sífilis'}
    ];
    public doughnutChartData:number[] = [0,0,0,0];
    public doughnutChartLabels:Array<any> = ['Chikungunya', 'Dengue', 'Zika', 'Sífilis'];
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

    public lineChartDatax:any[] = [ {data:[1, 0, 1], label:'COLONIA CELLA'},
                              {data:[2, 3, 0], label:'FAMILIA ALTA FLORESTA '},
                              {data:[5, 4, 5], label:'FAMILIA CRISTO REI '},
                              {data:[0, 1, 0], label:'CENTRO DE SAUDE DA FAMILIA ELDORADO '},
                              {data:[24, 13, 2], label:'CENTRO DE SAUDE DA FAMILIA JARDIM AMERICA '},
                              {data:[20, 3, 1], label:'CENTRO DE SAUDE DA FAMILIA JARDIM DO LAGO '},
                              {data:[3, 0, 3], label:'CENTRO DE SAUDE DA FAMILIA LESTE '},
                              {data:[1, 1, 1], label:'CENTRO DE SAUDE DA FAMILIA MARECHAL BORMANN '},
                              {data:[6, 1, 2], label:'CENTRO DE SAUDE DA FAMILIA QUEDAS DO PALMITAL'},
                              {data:[14, 2, 4], label:'CENTRO DE SAUDE DA FAMILIA SANTA MARIA '},
                              {data:[15, 3, 6], label:'CENTRO DE SAUDE DA FAMILIA SANTO ANTONIO '},
                              {data:[21, 5, 4], label:'CENTRO DE SAUDE DA FAMILIA SAO PEDRO '},
                              {data:[13, 4, 2], label:'CENTRO DE SAUDE DA FAMILIA SEMINARIO '},
                              {data:[4, 0, 3], label:'CENTRO DE SAUDE DA FAMILIA SUL '},
                              {data:[7, 2, 2], label:'CENTRO DE SAUDE DA FAMILIA VILA REAL '},
                              {data:[11, 9, 1], label:'CENTRO INTEGRADO DE SAUDE BELA VISTA '},
                              {data:[45, 10, 12], label:'CENTRO INTEGRADO DE SAUDE GRANDE EFAPI '},
                              {data:[22, 3, 4], label:'CENTRO INTEGRADO DE SAUDE NORTE '},
                              {data:[21, 2, 4], label:'CENTRO INTEGRADO DE SAUDE OESTE '},
                              {data:[1, 0, 0], label:'CENTRO INTEGRADO DE SAUDE GOIO ÊN '},
                              {data:[12, 1, 1], label:'CENTRO INTEGRADO DE SAUDE CHICO MENDES '},
                              {data:[9, 2, 0], label:'CENTRO INTEGRADO DE SAUDE SAIC '},
                              {data:[5, 0, 0], label:'CENTRO INTEGRADO DE SAUDE BELVEDERE '},
                              {data:[1, 0, 0], label:'CENTRO DE SAUDE DA FAMILIA ALTA DA SERRA '},
                              {data:[0, 0, 0], label:'CENTRO DE SAUDE DA ALDEIA CONDÁ'},
                              {data:[0, 0, 0], label:'CENTRO DE SAUDE DO TOLDO CHIMBANGUE'},
                              {data:[1, 1, 0], label:'CENTRO DE SAUDE SEDE FIGUEIRA'},
                              {data:[0, 0, 0], label:'CENTRO DE SAUDE LINHA CACHOEIRA'}];

}
