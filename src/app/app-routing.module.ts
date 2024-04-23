import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'tasks', component:TasksComponent},
  {path:'account', loadChildren: () => import('./modules/account/account.module').then(module => module.AccountModule)},
  {path:'not-found', component:NotFoundComponent},
  {path:'**', component:NotFoundComponent, pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
