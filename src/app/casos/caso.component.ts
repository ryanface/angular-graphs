declare var require: any;
declare var io: any;
var configuration = require('../../configuration');

import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caso',
  templateUrl: './caso.component.html',
  styleUrls: ['./caso.component.css'],
})
export class CasoComponent implements OnInit {

  public list:any[];
  public socket:any;
  public result_s:any;
  //cadastro
  public idUnidade:number = Math.floor(Math.random() * 6) + 1;
  public idPessoa:number  = Math.floor(Math.random() * 6) + 1;
  public unidade:string   = "centro";
  public bairro:string    = "centro";
  public sexo:string      = "F";
  public dataRegistro:string   = new Date().toLocaleString().toString();
  public dataTransmicao:string = new Date().toLocaleString().toString();
  public doenca:string    = "Chikungunya";

  constructor(private appService : AppService, private route: Router ) { }

  ngOnInit() {
      this.socket = io(configuration.socket,{'transports': ['websocket', 'polling']});
      this.socket.on('connect', function(){ console.log('connect');  });
      this.socket.on('event', function(data){ console.log('event'); });
      this.socket.on('disconnect', function(){ console.log('disconnect'); });

      this.socket.on('save', (a) =>{ this.result_save(a);  });
      this.socket.on('getCasos', (a) =>{ console.log('getCasos',a); this.list = a; });

      if(!this.appService.checkLogin()){
        this.route.navigate(['/modelo']);
      }else{
        //setTimeout(()=>{ this.get(); },5000);
        this.socket.on('MongoDB', (a) =>{ if(a == 'ok') this.get();  });
      }
  }
  ngOnDestroy() {
      this.socket.destroy();
      this.socket = undefined;
  }
  public result_save(a){
      this.result_s = a;
  }
  public renew(){
        let doencas = ['Chikungunya','Chikungunya','Dengue','Zika vírus','Sífilis'];
        let bairros = ['Líder','Cristo Rei','Esplanada','Santa Maria','Palmital','Maria Goretti','Eldorado'];
        let tmp = Math.floor(Math.random() * 6) + 1;
        this.idUnidade = Math.floor(Math.random() * 6) + 1;
        this.idPessoa  = tmp;
        this.unidade   = bairros[tmp];
        this.bairro    = bairros[tmp];
        this.sexo     = "F";
        let data = new Date(+(new Date()) - Math.floor(Math.random()*40000000000)).toLocaleString().toString();
        this.dataRegistro   = data;
        this.dataTransmicao = data;
        this.doenca    = doencas[Math.floor(Math.random() * 5)];
  }
  public get(){
        //this.socket.emit("getCasos");
  }
  public add(num:number=1){
      var list = [];
      for(let i=0; i<=num ; i++){
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
            list.push(data);
            this.renew();
       }
       this.socket.emit("proc",list);
  }
}
