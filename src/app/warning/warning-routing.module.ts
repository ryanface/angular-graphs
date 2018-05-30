/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WarningComponent} from "./warning.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'warning', component: WarningComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class WarningRoutingModule{}
