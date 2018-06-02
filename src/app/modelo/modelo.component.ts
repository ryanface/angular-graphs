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
         this.route.navigate(['/dashboard'])
       }else{
         this.appService.AUTENTICATE = false;
       }
  }
  checkLogin(){
     return this.appService.checkLogin();
  }

  public get(){
    this.appService.get('http://localhost:8102/api/all').subscribe((response: Response)=> {
         this.list = response.json();
         console.log(this.list);
    });
  }
  public add(){
      console.log('add');
      let data: any = {
           "name": "1111111111",
           "creationDate": 1516165830856,
           "groupSettings": {
             "bike" : "1111"
           }
      };
      let tmp = JSON.stringify( data );
      this.appService.post('http://localhost:8102/api/create',tmp).subscribe((response: Response)=> {
           console.log('grupo.post',response.json());
           this.get();
      });
  }
  public remove(id:string){
     console.log('pai remove');
     this.appService.post('http://localhost:8102/api/del/'+id,{}).subscribe((response: Response)=> {
          console.log('remove',response.json());
          this.get();
     });
  }
}
