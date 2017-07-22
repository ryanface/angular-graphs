import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebserviceRoutingModule} from "./webservice-routing.module";
import { WebserviceComponent} from "./webservice.component";
import { WebserviceService} from "./webservice.service";
import { FormsModule} from "@angular/forms";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DatePickerModule } from 'ng2-datepicker';
import { RoscaModule } from "../rosca/rosca.module";

@NgModule({
  imports: [
    CommonModule,
    WebserviceRoutingModule,
    FormsModule,
    ChartsModule,
    DatePickerModule,
    RoscaModule,
  ],
  declarations: [ WebserviceComponent ],
  exports:[ WebserviceComponent ],
  providers: [ WebserviceService ]
})
export class WebserviceModule { }
