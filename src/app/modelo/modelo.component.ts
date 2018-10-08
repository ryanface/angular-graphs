import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  //directives: [ FilterListComponent ]
})
export class ModeloComponent implements OnInit {

  public list:any[];
  public user:string;
  public pass:string

  constructor(private appService : AppService, private route: Router ) { }

  ngOnInit() {
      //this.get();
  }
  public autenticate(){
       if(this.user == 'admin' && this.pass == '123'){
           this.appService.AUTENTICATE = true;
           this.appService.ADMIN = true;
           this.route.navigate(['/dashboard']);
       }else if(this.user == 'view' && this.pass == '123'){
           this.appService.AUTENTICATE = true;
           this.route.navigate(['/dashboard']);
       }else{
           this.appService.AUTENTICATE = false;
       }
  }
  checkLogin(){
     return this.appService.checkLogin();
  }
  checkAdmin(){
    return this.appService.checkAdmin();
  }
}
