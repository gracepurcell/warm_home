import { Component, OnInit } from '@angular/core';
import { en } from '../../../i18ndata/en';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  // text: any = en;
  serviceWhyTitle: string;
  serviceWhyAnswer: string;
  model = en;
  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }


}
