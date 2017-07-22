import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grafico2RoutingModule } from "./grafico2-routing.module";
import { Grafico2Component } from "./grafico2.component";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AppData } from "../app.data";
import { DemoModule } from '../demo/demo.module';
import { FilterListModule } from './filter-list/filter-list.module';
import { DatePickerModule } from 'ng2-datepicker';
import { RoscaModule } from "../rosca/rosca.module";

@NgModule({
  imports: [
    CommonModule,
    Grafico2RoutingModule,
    FormsModule,
    ChartsModule,
    DemoModule,
    FilterListModule,
    DatePickerModule,
    RoscaModule,
  ],
  declarations: [ Grafico2Component ],
  exports:[ Grafico2Component ],
  providers: [ AppData ]
})
export class Grafico2Module { }
