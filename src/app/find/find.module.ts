import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FindRoutingModule} from "./find-routing.module";
import {FindComponent} from "./find.component";
import {FindService} from "./find.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FindRoutingModule,
    FormsModule
  ],
  declarations: [ FindComponent ],
  exports:[ FindComponent ],
  providers: [ FindService ]
})

export class FindModule { }
