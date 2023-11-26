import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommitsComponent } from './commits.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivateComponent } from './pages/private/private.component';

const routes: Routes = [
  {
    path: 'home',
    component: CommitsComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'privatecommits',
        component: PrivateComponent
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
