import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasoComponent } from './caso.component';
import { CasoRoutingModule } from "./caso-routing.module";
import { FilterListModule } from './filter-list/filter-list.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CasoRoutingModule,
    FilterListModule,
    FormsModule
  ],
  declarations: [ CasoComponent ],
  exports:[ CasoComponent ],
})
export class CasoModule { }
