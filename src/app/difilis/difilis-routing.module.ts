/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DifilisComponent} from "./difilis.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'sifilisx', component: DifilisComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class DifilisRoutingModule{}
