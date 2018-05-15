import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportComponent } from './import.component';
import { ImportRoutingModule } from "./import-routing.module";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FilterListModule } from './filter-list/filter-list.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ImportRoutingModule,
    ChartsModule,
    FilterListModule,
    FormsModule
  ],
  declarations: [ ImportComponent ],
  exports:[ ImportComponent ],
})
export class ImportModule { }
