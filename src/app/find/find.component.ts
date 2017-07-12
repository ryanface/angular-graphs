import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FindService } from "./find.service";

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {

  gifs: any[] = [];
  limit: string = '2';
  term: string = 'car';

  constructor( private FindService : FindService) { }

  ngOnInit() {
  }

  pesquisar(){
     this.FindService.load(this.limit,this.term).subscribe((response: Response)=> {
           this.gifs = response.json().data;
     });

  }

}
