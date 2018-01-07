import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRequisitionsComponent } from './components/user-requisitions/user-requisitions.component';

const routes: Routes = [
  {path: 'requisitions', component: UserRequisitionsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'requisitions'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
