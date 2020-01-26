import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'warmhome',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Warm home'
    },
    children: [
      {
        path: 'warmhome',
        loadChildren: './warmhome/warmhome.module#WarmHomeModule'
      },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
