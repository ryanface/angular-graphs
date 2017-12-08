import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphMapComponent } from "./graph-map.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ GraphMapComponent ],
  exports: [ GraphMapComponent ]
})
export class GraphMapModule { }
