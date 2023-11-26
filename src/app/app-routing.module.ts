import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./commitsModule/commits.module')
    .then(m => m.CommitsModule)
  },
  {
    path: '',
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
