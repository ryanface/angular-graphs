/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CasoComponent} from "./caso.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'casos', component: CasoComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class CasoRoutingModule{}
