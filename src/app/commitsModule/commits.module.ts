import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitsRoutingModule } from './commits-routing.module';
import { CommitsComponent } from './commits.component';
import { HeaderComponent } from './components/header/header.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { GraphComponent } from './components/graph/graph.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { CommitDetailsComponent } from './components/commit-details/commit-details.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivateComponent } from './pages/private.component';
import { RepoFormComponent } from './components/repo-form/repo-form.component';


@NgModule({
  declarations: [
    CommitsComponent,
    HeaderComponent,
    FrontPageComponent,
    GraphComponent,
    PresentationComponent,
    CommitDetailsComponent,
    HomeComponent,
    PrivateComponent,
    RepoFormComponent,
  ],
  imports: [
    CommonModule,
    CommitsRoutingModule
  ]
})
export class CommitsModule { }
