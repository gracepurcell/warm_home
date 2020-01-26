import { TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from './customtranslateloader.class';

// custom loader factory for translation
export function HttpLoaderFactory() {
  return new CustomTranslateLoader();
}

export function getI18nTranslateModuleConfig(): any {
  return {
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: []
    }
  };
}
