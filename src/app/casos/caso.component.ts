import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';

@Component({
  selector: 'app-caso',
  templateUrl: './caso.component.html',
  styleUrls: ['./caso.component.css'],
})
export class CasoComponent implements OnInit {

  public list:any[];

  constructor(private appService : AppService ) { }

  ngOnInit() {
      this.get();
  }
  public get(){
    this.appService.get('http://localhost:8102/api/caso/all').subscribe((response: Response)=> {
         this.list = response.json();
         console.log(this.list);
    });
  }
  public remove(id:string){
     console.log('pai remove');
     this.appService.post('http://localhost:8102/api/caso/del/'+id,{}).subscribe((response: Response)=> {
          console.log('remove',response.json());
          this.get();
     });
  }
  public add(){
      let data: any = {
                  "nu_NOTIFIC" : 1174258,
                  "tp_NOT" : 2,
                  "id_AGRAVO" : "O981",
                  "dt_NOTIFIC" : "3/21/2017",
                  "nu_ANO" : 2017,
                  "sg_UF_NOT" : 42,
                  "id_MUNICIP" : 420420,
                  "id_REGIONA" : "",
                  "id_UNIDADE" : 2537575,
                  "dt_DIAG" : "3/21/2017",
                  "nm_PACIENT" : "FABIANA MARTINS ALVES",
                  "dt_NASC" : "9/21/1992",
                  "cs_SEXO" : "F",
                  "cs_GESTANT" : 2,
                  "nm_MAE_PAC" : "ZILDA MARTINS ALVES",
                  "sg_UF" : 42,
                  "nm_BAIRRO" : "PASSO DOS FORTES",
                  "nm_LOGRADO" : "RUA JOSE LUIZ MAIA",
                  "nu_NUMERO" : 21123,
                  "nm_COMPLEM" : "",
                  "dtTESTE1" : "3/21/2017",
                  "dsmotivo" : "FOI TRATADO TAMBEM",
                  "dt_DIGITA" : "3/31/2017",
                  "dt_TRANSUS" : "",
                  "dt_TRANSDM" : "",
                  "dt_TRANSSM" : "4/6/2017",
                  "dt_TRANSRM" : "",
                  "dt_TRANSRS" : "",
                  "dt_TRANSSE" : "",
                  "dt_OBS" : "",
                  "tipo" : "gestante"
              };
      let tmp = JSON.stringify( data );
      this.appService.post('http://localhost:8102/api/caso/create',tmp).subscribe((response: Response)=> {
           console.log('caso.post',response.json());
           this.get();
      });
    }
}
