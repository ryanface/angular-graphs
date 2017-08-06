import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-difilis',
  templateUrl: './difilis.component.html',
  styleUrls: ['./difilis.component.css']
})
export class DifilisComponent implements OnInit {

  constructor() { }

   public lineChartLabels:Array<any> = ['Sífilis em adulto','Sífilis em gestante','Sífilis congênita'];
   public lineChartOptions:any = {
     responsive: true,
     //maintainAspectRatio: false,
     showLines:true,
     //spanGaps:false,
     elements: { line: { tension: 0, } },
     fill: false,//suavizar bordas
     tooltips: {enabled : true},
   };
   public lineChartLegend:boolean = true;
   public lineChartType:string = 'line';
   public lineChartData:any[] = [ {data:[1, 0, 1], label:'COLONIA CELLA'},
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
        public json:any[] = [];

        public go_totais(e:any):any{
           let tmp = [];
           for(let i in e){
               for(let j in e[i].data){
                    if(tmp[j] == undefined || tmp[j] == 'NaN') tmp[j] = 0;
                    tmp[j] += parseInt(e[i].data[j]);
               }
           }
           return {data:tmp, label:'Total'};
       }
       ngOnInit() {
           this.json = this.lineChartData;
           this.json.push(this.go_totais(this.lineChartData));

       }
}
