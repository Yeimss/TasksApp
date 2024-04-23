import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'account', loadChildren: () => import('./modules/account/account.module').then(module => module.AccountModule)},
  {path:'not-found', component:NotFoundComponent},
  {path:'**', component:HomeComponent, pathMatch:"full"},
  {path:'', component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
