import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphLineComponent } from "./graph-line.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ GraphLineComponent ],
  exports: [ GraphLineComponent ]
})
export class GraphLineModule { }
