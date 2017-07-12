/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FindComponent} from "./find.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'search', component: FindComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class FindRoutingModule{}
