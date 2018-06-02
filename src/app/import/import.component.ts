declare var require: any;
declare var io: any;
var configuration = require('../../configuration');

import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
  //directives: [ FilterListComponent ]
})
export class ImportComponent implements OnInit {

  public list:any[];
  public term:string = "'Pag1'!A1:H10";
  public planilha :string = "1rYqJ3orTe09ON-A6HaOXhvhuWdpo4jfPQyYWMVtq10A";//https://docs.google.com/spreadsheets/d/1rYqJ3orTe09ON-A6HaOXhvhuWdpo4jfPQyYWMVtq10A
  public socket:any;
  public orientacao:string = 'ROWS';
  public join:any[] = [];

  public result_s:any;

  constructor(private appService : AppService,   private route: Router ) { }

  ngOnInit() {
    this.socket = io(configuration.socket,{'transports': ['websocket', 'polling']});
    this.socket.on('connect', function(){ console.log('connect');  });
    this.socket.on('event', function(data){ console.log('event'); });
    this.socket.on('disconnect', function(){ console.log('disconnect'); });
    this.socket.on('html', (a) =>{ this.result(a);  });
    this.socket.on('save', (a) =>{ this.result_save(a);  });

   if(!this.appService.checkLogin())
     this.route.navigate(['/modelo'])
  }
  ngOnDestroy() {
    this.socket.destroy();
    this.socket = undefined;
  }

  public Loadx(){
    this.join = [];
    this.result_s = '';
    var tmp = {'Plan':this.planilha,'Load':this.term,'major': this.orientacao};//'COLUMNS'};//'ROWS'};
    console.log('Load',tmp);
    this.socket.emit("open_connect",tmp);
  }
  public result(a:any){
      this.list = a.values;
      //this.data(this.list);
  }
  public result_save(a){
      this.result_s = a;
  }
  public selectOrientacao(){
      this.orientacao = (this.orientacao == 'ROWS') ? 'COLUMNS' : 'ROWS';
  }
  public save(){
    if(this.list[0] != undefined)
      this.socket.emit("save_plan",this.list);
  }

}
