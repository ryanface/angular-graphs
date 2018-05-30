import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterListComponent } from "./filter-list.component";
import {DataTableModule} from "angular2-datatable";


@NgModule({
  imports: [
    CommonModule,
    DataTableModule
  ],
  declarations: [ FilterListComponent ],
  exports: [ FilterListComponent ]
})
export class FilterListModule { }
