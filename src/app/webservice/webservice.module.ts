import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebserviceRoutingModule} from "./webservice-routing.module";
import { WebserviceComponent} from "./webservice.component";
import { WebserviceService} from "./webservice.service";
import { FormsModule} from "@angular/forms";
import { RoscaModule } from "../rosca/rosca.module";
import { ZingModule } from "../zing/zing.module";
import { GraphMapModule } from './graph-map/graph-map.module';

@NgModule({
  imports: [
    CommonModule,
    WebserviceRoutingModule,
    FormsModule,
    RoscaModule,
    ZingModule,
    GraphMapModule,
  ],
  declarations: [ WebserviceComponent ],
  exports:[ WebserviceComponent ],
  providers: [ WebserviceService ]
})
export class WebserviceModule { }
