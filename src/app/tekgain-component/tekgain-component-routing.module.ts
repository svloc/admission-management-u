import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component:DashboardComponent,
    pathMatch: 'full',
    data: { isDashboard: true } 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule) 
      },
      {
        path: 'associate',
        loadChildren: () => import('./associate/associate.module').then(m => m.AssociateModule)
      },
      {
        path: 'admission',
        loadChildren: () => import('./admission/admission.module').then(m => m.AdmissionModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TekgainComponentRoutingModule { }
