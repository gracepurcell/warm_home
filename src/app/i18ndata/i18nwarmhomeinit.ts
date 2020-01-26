import { CustomTranslateLoader } from './../i18nconfig/customtranslateloader.class';

import { en } from './en';

export function i18nWarmHomeInit() {
  CustomTranslateLoader.append('en', en);
}
