import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Input()
  gifs: any[] = [];

  constructor(private AppService : AppService) { }

  ngOnInit() {
  }

  public search(term:string):void {
    this.AppService.json(term,'').subscribe((response: Response) => this.gifs = response.json());
  }
}
