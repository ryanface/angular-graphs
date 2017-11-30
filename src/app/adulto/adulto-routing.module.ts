import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdultoComponent } from "./adulto.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'sifilis', component: AdultoComponent },
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class AdultoRoutingModule{}
