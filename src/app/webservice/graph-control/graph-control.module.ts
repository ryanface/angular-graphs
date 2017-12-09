import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphControlComponent } from "./graph-control.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ GraphControlComponent ],
  exports: [ GraphControlComponent ]
})
export class GraphControlModule { }
