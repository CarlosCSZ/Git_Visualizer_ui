import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitsComponent } from './commits.component';

const routes: Routes = [
  {
    path: 'home',
    component: CommitsComponent,
    children: [
      {
        path: 'private',
        component: CommitsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitsRoutingModule { }
