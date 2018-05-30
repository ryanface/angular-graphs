import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterListComponent } from "./filter-list.component";
import {DataTableModule} from "angular2-datatable";
import { KeysPipe } from '../../../pipes/keys';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule
  ],
  declarations: [ FilterListComponent, KeysPipe ],
  exports: [ FilterListComponent, KeysPipe ]
})
export class FilterListModule { }
