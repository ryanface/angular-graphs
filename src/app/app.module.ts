import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { ModeloModule } from './modelo/modelo.module';
import { CasoModule } from './casos/caso.module';
import { ImportModule } from './import/import.module';
import { WarningModule } from './warning/warning.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { GlobalDataService } from './globaldata.service';
import { AppService } from "./app.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ModeloModule,
    CasoModule,
    ImportModule,
    DashboardModule,
    FormsModule,
    WarningModule,
  ],
  providers: [GlobalDataService,AppService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule { }
