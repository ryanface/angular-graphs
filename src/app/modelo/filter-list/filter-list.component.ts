import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { AppService } from "../../app.service";

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Input()
    list: any[] = [];
  @Output()
    del:EventEmitter<string> = new EventEmitter();


  constructor(private AppService : AppService) { }

  ngOnInit() {
  }

  public remove(id:string):void {
      console.log('child remove',id);
      this.del.emit(id);
  }
}
