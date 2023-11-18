import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commitsModule/components/header/header.component';
import { FrontPageComponent } from './commitsModule/components/front-page/front-page.component';
import { GraphComponent } from './commitsModule/components/graph/graph.component';
import { PresentationComponent } from './commitsModule/components/presentation/presentation.component';
import { CommitDetailsComponent } from './commitsModule/components/commit-details/commit-details.component';
import { CommitsModule } from './commitsModule/commits.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommitsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-left',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
