import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { GraphComponent } from './components/graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FrontPageComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
