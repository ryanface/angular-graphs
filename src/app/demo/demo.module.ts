import { NgModule }      from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { DemoComponent }   from './demo.component';
import { DemoRoutingModule }   from './demo-routing.module';
import { DataFilterPipe }   from './data-filter.pipe';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports:      [
    CommonModule,
    DataTableModule,
    FormsModule,
    HttpModule,
    DemoRoutingModule,
    ChartsModule
  ],
  declarations: [ DemoComponent, DataFilterPipe ],
  exports: [DemoComponent]
})

export class DemoModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
