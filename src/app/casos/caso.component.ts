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
  //cadastro
  public idUnidade:number = Math.floor(Math.random() * 6) + 1;
  public idPessoa:number  = Math.floor(Math.random() * 6) + 1;
  public unidade:string   = "centro";
  public bairro:string    = "centro";
  public sexo:string      = "F";
  public dataRegistro:string   = new Date().toLocaleString().toString();
  public dataTransmicao:string = new Date().toLocaleString().toString();
  public doenca:string    = "modelo";

  constructor(private appService : AppService ) { }

  ngOnInit() {
      this.get();
  }
  public renew(){
    let doencas = ['Influenza','Sarampo','Rubéola','Caxumba','Catapora','Erisipela','Herpangina'];
    let bairros = ['Líder','Cristo Rei','Esplanada','Santa Maria','Palmital','Maria Goretti','Eldorado'];
    let tmp = Math.floor(Math.random() * 6) + 1;
    this.idUnidade = Math.floor(Math.random() * 6) + 1;
    this.idPessoa  = tmp;
    this.unidade   = bairros[tmp];
    this.bairro    = bairros[tmp];
    this.sexo     = "F";
    this.dataRegistro   = new Date(+(new Date()) - Math.floor(Math.random()*90000000000)).toLocaleString().toString();
    this.dataTransmicao = new Date(+(new Date()) - Math.floor(Math.random()*90000000000)).toLocaleString().toString();
    this.doenca    = doencas[Math.floor(Math.random() * 6) + 1];
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
                "idUnidade":this.idUnidade,
                "idPessoa":this.idPessoa,
                "unidade":this.unidade,
                "bairro":this.bairro,
                "sexo":this.sexo,
                "dataRegistro":this.dataRegistro,
                "dataTransmicao":this.dataTransmicao,
                "doenca":this.doenca
            };
       this.renew();
      //let tmp = JSON.stringify( data );
      this.appService.post('http://localhost:8102/api/caso/create',data).subscribe((response: Response)=> {
           console.log('caso.post',response.json());
           this.get();
      });
    }
}
