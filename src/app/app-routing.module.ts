import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuardService} from './shared/services/auth-guard.service';
import {HelloWorldComponent} from './views/hello-world/hello-world.component';
import {AccountHomeComponent} from './views/account-home/account-home.component';
import {ProductDetailComponent} from './views/product-detail/product-detail.component';
import {AccountStatementInfoComponent} from './views/account-statement-info/account-statement-info.component';

const routes: Routes = [
  { path: 'home', component: AccountHomeComponent, canActivate : [AuthGuardService]},
  // { path: 'home', component: HelloWorldComponent, loadChildren: () => import('./lazy-loading/lazy-loading.module').then(m => m.LazyLoadingModule)},
  { path: 'productDetails/:id', component:ProductDetailComponent, canActivate : [AuthGuardService]},
  { path: 'statement/:id', component:AccountStatementInfoComponent , canActivate : [AuthGuardService]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
