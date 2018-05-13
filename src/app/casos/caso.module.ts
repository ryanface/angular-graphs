import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasoComponent } from './caso.component';
import { CasoRoutingModule } from "./caso-routing.module";
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    CasoRoutingModule,
    FilterListModule
  ],
  declarations: [ CasoComponent ],
  exports:[ CasoComponent ],
})
export class CasoModule { }
