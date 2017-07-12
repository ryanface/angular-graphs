/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Grafico2Component} from "./grafico2.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'grafico2', component: Grafico2Component }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class Grafico2RoutingModule{}
