/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent} from "./dashboard.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class DashboardRoutingModule{}
