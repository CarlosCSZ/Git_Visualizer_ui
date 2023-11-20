import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitsComponent } from './commitsModule/commits.component';
import { HomeComponent } from './commitsModule/pages/home/home.component';
import { PrivateComponent } from './commitsModule/pages/private/private.component';

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
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
