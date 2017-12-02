import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SunburstRoutingModule } from "./sunburst-routing.module";
import { SunburstComponent } from "./sunburst.component";

@NgModule({
  imports: [
    CommonModule,
    SunburstRoutingModule
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
