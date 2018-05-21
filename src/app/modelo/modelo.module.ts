import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeloComponent } from './modelo.component';
import { ModeloRoutingModule } from "./modelo-routing.module";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    ModeloRoutingModule,
    ChartsModule,
    FilterListModule
  ],
  declarations: [ ModeloComponent ],
  exports:[ ModeloComponent ],
})
export class ModeloModule { }
