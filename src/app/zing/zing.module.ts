import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZingComponent } from "./zing.component";
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule, ChartModule
  ],
  declarations: [ ZingComponent ],
  exports:[ ZingComponent ]
})
export class ZingModule { }
