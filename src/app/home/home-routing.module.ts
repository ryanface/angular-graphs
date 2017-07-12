/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'inicio', component: HomeComponent },
      { path: '', component: HomeComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class HomeRoutingModule{}
