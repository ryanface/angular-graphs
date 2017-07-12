/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebserviceComponent} from "./webservice.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'grafico', component: WebserviceComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class WebserviceRoutingModule{}
