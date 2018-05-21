declare var io: any;

import { Component, OnInit } from '@angular/core';
import { AppService } from "../app.service";
import { Response } from '@angular/http';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css'],
  //directives: [ FilterListComponent ]
})
export class WarningComponent implements OnInit {

  public list:any[];

  constructor(private appService : AppService ) { }

  ngOnInit() {
      this.get();
  }
  public get(){
      this.appService.get('http://localhost:8102/api/war/all').subscribe((response: Response)=> {
           this.list = response.json();
           console.log(this.list);
      });
  }
  public proccess(){
      this.appService.get('http://localhost:8102/api/war/run').subscribe((response: Response)=> {
           console.log(response.json());
      });
  }

}
