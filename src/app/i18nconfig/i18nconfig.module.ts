import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomTranslateLoader } from './customtranslateloader.class';
import { I18nService } from './i18n.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    I18nService
  ]
})
export class I18nConfigModule {
  constructor(i18nService: I18nService) {
    // save the service in the loader
    CustomTranslateLoader.i18nService = i18nService;
    i18nService.setInitialLanguage();
  }
}
