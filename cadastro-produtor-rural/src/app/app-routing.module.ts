import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProducerListComponent } from './components/pages/producer-list/producer-list.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { EditRegisterComponent } from './components/pages/edit-register/edit-register.component';
import { DeleteRegisterComponent } from './components/delete-register/delete-register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'producer-list',
    component: ProducerListComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'register/delete-register/:id',
    component: DeleteRegisterComponent
  },
  {
    path: 'register/edit-register/:id',
    component: EditRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
