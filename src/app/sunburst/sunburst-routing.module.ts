import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SunburstComponent } from "./sunburst.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'sunburst', component: SunburstComponent },
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class SunburstRoutingModule{}
