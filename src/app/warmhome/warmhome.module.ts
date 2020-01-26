import { CardComponent } from './../components/card/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { WarmHomeRoutingModule } from './warmhome.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './routes/about/about.component';
@NgModule({
  declarations: [
    AboutComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    WarmHomeRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class WarmHomeModule { }
