import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuardService} from './shared/services/auth-guard.service';
import {HelloWorldComponent} from './views/hello-world/hello-world.component';

const routes: Routes = [
  { path: 'home', component: HelloWorldComponent, canActivate : [AuthGuardService]},
  // { path: 'home', component: HelloWorldComponent, loadChildren: () => import('./lazy-loading/lazy-loading.module').then(m => m.LazyLoadingModule)},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
