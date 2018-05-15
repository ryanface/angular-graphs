/**
 * Created by ryan on 02/07/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImportComponent} from "./import.component";

@NgModule({
  imports:[
    RouterModule.forChild([
      { path: 'import', component: ImportComponent }
    ])
  ],
  exports:[
    RouterModule
  ]

})

export class ImportRoutingModule{}
