import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningComponent } from './warning.component';
import { WarningRoutingModule } from "./warning-routing.module";
import { FormsModule } from '@angular/forms';
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    WarningRoutingModule,
    FormsModule,
    FilterListModule
  ],
  declarations: [ WarningComponent ],
  exports:[ WarningComponent ],
})
export class WarningModule { }
