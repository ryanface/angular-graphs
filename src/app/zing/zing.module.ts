import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZingComponent } from "./zing.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ZingComponent ],
  exports:[ ZingComponent ]
})
export class ZingModule { }
