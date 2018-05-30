/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModeloComponent} from "./modelo.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'modelo', component: ModeloComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class ModeloRoutingModule{}
