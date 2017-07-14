import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grafico2RoutingModule } from "./grafico2-routing.module";
import { Grafico2Component } from "./grafico2.component";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AppData } from "../app.data";
import { DemoModule } from '../demo/demo.module';

@NgModule({
  imports: [
    CommonModule,
    Grafico2RoutingModule,
    FormsModule,
    ChartsModule,
    DemoModule
  ],
  declarations: [ Grafico2Component ],
  exports:[ Grafico2Component ],
  providers: [ AppData ]
})
export class Grafico2Module { }
