import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoComponent} from "./demo.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'datatable', component: DemoComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class DemoRoutingModule{}
