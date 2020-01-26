import { AboutComponent } from './routes/about/about.component';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'about page',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarmHomeRoutingModule { }
