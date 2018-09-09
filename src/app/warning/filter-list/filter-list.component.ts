import { Component, OnInit, Input, Output, NgModule, EventEmitter } from '@angular/core';
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
    proccessAll:EventEmitter<string> = new EventEmitter();
    @Output()
    getScoreAll:EventEmitter<string> = new EventEmitter();

  constructor(private AppService : AppService) { }

  ngOnInit() {
  }

  execProccessAll(a) {
      this.proccessAll.emit(a);
  }
  execGetScoreAll(a){
      this.getScoreAll.emit(a);
  }

}
