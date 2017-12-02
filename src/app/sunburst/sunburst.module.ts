import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SunburstRoutingModule } from "./sunburst-routing.module";
import { SunburstComponent } from "./sunburst.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SunburstRoutingModule,
    FormsModule,
  ],
  declarations: [
    SunburstComponent
  ],
  exports:[
    SunburstComponent
  ],
  providers: [  ],
})
export class SunburstModule { }
