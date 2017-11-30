import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdultoRoutingModule } from "./adulto-routing.module";
import { AdultoComponent } from "./adulto.component";

@NgModule({
  imports: [
    CommonModule,
    AdultoRoutingModule
  ],
  declarations: [
    AdultoComponent
  ],
  exports:[
    AdultoComponent
  ],
  providers: [  ],
})
export class AdultoModule { }
