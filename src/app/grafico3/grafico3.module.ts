import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Grafico3RoutingModule } from "./grafico3-routing.module";
import { Grafico3Component } from "./grafico3.component";
import { AppService } from "../app.service";
import { AppData } from "../app.data";
import { FilterListModule } from './filter-list/filter-list.module';
import { DatePickerModule } from 'ng2-datepicker';
import { RoscaModule } from "../rosca/rosca.module";

@NgModule({
  imports: [
    CommonModule,
    Grafico3RoutingModule,
    FormsModule,
    ChartsModule,
    FilterListModule,
    DatePickerModule,
    RoscaModule
  ],
  declarations: [ Grafico3Component ],
  exports:[ Grafico3Component ],
  providers: [ AppService,AppData ],
})
export class Grafico3Module { }
