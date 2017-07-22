import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoscaComponent } from "./rosca.component";
import { RoscaRoutingModule} from "./rosca-routing.module";
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    RoscaRoutingModule,
    ChartsModule
  ],
  declarations: [ RoscaComponent ],
  exports:[ RoscaComponent ],
  providers: [  ]
})
export class RoscaModule { }
