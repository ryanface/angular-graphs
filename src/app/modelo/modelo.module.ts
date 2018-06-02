import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeloComponent } from './modelo.component';
import { ModeloRoutingModule } from "./modelo-routing.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ModeloRoutingModule,
    FormsModule
  ],
  declarations: [ ModeloComponent ],
  exports:[ ModeloComponent ],
})
export class ModeloModule { }
