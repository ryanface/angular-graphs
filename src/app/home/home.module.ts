import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home.component";
import { ZingModule } from "../zing/zing.module";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ZingModule
  ],
  declarations: [
    HomeComponent
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
