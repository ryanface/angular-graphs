/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Grafico3Component} from "./grafico3.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'grafico3', component: Grafico3Component }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class Grafico3RoutingModule{}
