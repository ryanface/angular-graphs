/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoscaComponent} from "./rosca.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'txt', component: RoscaComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class RoscaRoutingModule{}
