import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { HomeModule } from "./home/home.module";
import { FindModule } from "./find/find.module";
import { WebserviceModule } from './webservice/webservice.module';
import { Grafico2Module } from './grafico2/grafico2.module';
import { Grafico3Module } from './grafico3/grafico3.module';
import { DemoModule } from './demo/demo.module';
import { RoscaModule } from './rosca/rosca.module';
import { ZingModule } from './zing/zing.module';
import { DifilisModule } from './difilis/difilis.module';
import { AdultoModule } from './adulto/adulto.module';
import { SunburstModule } from './sunburst/sunburst.module';

import { GlobalDataService } from './globaldata.service';
import { AppService } from "./app.service";
import { GoogleChartComponent } from './google-chart/google-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HomeModule,
    FindModule,
    WebserviceModule,
    Grafico2Module,
    Grafico3Module,
    DemoModule,
    RoscaModule,
    ZingModule,
    DifilisModule,
    AdultoModule,
    SunburstModule
  ],
  providers: [GlobalDataService,AppService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
