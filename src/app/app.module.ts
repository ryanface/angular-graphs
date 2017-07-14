import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent
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
    DemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
