import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifilisComponent } from './difilis.component';
import { DifilisRoutingModule } from "./difilis-routing.module";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    DifilisRoutingModule,
    ChartsModule,
    FilterListModule
  ],
  declarations: [ DifilisComponent ],
  exports:[ DifilisComponent ],
})
export class DifilisModule { }
