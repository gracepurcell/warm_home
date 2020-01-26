import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from 'luxon';
import { Observable } from 'rxjs/internal/Observable';

import { Log } from 'ng2-logger/browser';

import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import {
  deLocale, enGbLocale,
} from 'ngx-bootstrap/locale';

const log = Log.create('I18nService');

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  // tslint:disable-next-line:variable-name
  private static _currentLanguage: string = null;
  // tslint:disable-next-line:variable-name
  private static _languageChanged: EventEmitter<string> = new EventEmitter();

  get languageChanged(): EventEmitter<string> {
      // hack to make the emitter a singleton
      // this fixed some race conditions with the unittests and the bootstrap datepicker localization
      return I18nService._languageChanged;
  }

  constructor(private translate: TranslateService) {
    log.info('constructor');
    I18nService.initBootstrapI18n();
  }

  public static initBootstrapI18n() {
    // https://valor-software.com/ngx-bootstrap/#/datepicker
    // datepicker translation
    listLocales();
    defineLocale('de', deLocale);
    defineLocale('en-gb', enGbLocale);
  }

  getCurrentLanguage(): string {
    return I18nService._currentLanguage;
  }

  /**
   * sets the default language (done by the I18n Module at startup)
   */
  setInitialLanguage() {
    if (I18nService._currentLanguage == null || I18nService._currentLanguage === undefined) {
      I18nService._currentLanguage = 'en';
    }

    const i18nLanguage = this.parseI18nLanguage(I18nService._currentLanguage);
    const luxonLanguage = this.parseLuxonLanguage(i18nLanguage); // needs to be mapped

    I18nService._currentLanguage = i18nLanguage;

    this.translate.setDefaultLang(i18nLanguage);
    this.setDefautLuxonLocale(luxonLanguage);
    this.languageChanged.emit(i18nLanguage);
  }

  /**
   * set to a new language
   *
   * this sets the translation settings
   * and also the luxon datetime settings
   *
   * on the ipad / phantomjs or other ancient browsers we will only
   * support "en" and "de"
   *
   * @param language language parameter
   */
  switchLanguage(language: string): Observable<any> {
    if (language == null || language === undefined) {
      language = 'en';
    }

    const i18nLanguage = this.parseI18nLanguage(language);
    const luxonLanguage = this.parseLuxonLanguage(i18nLanguage); // needs to be mapped

    return new Observable(observer => {
      this.translate.use(i18nLanguage).subscribe(() => {
        // wait until data is loaded
        I18nService._currentLanguage = language;
        this.setDefautLuxonLocale(luxonLanguage);
        // emit the change after this
        this.languageChanged.emit(I18nService._currentLanguage);
        observer.next({});
        observer.complete();
      });
    }
    );
  }

  reloadLang() {
    if (I18nService._currentLanguage == null || I18nService._currentLanguage === undefined) {
      I18nService._currentLanguage = 'en';
    }

    const i18nLanguage = this.parseI18nLanguage(I18nService._currentLanguage);
    I18nService._currentLanguage = i18nLanguage;

    this.translate.reloadLang(i18nLanguage);
  }

  private parseI18nLanguage(language: string): any {
    language = language.toLowerCase().trim();

    language = language.replace('/_/g', '-'); // replace _ with -
    const index = language.indexOf('-');

    if (index > -1) {
      // we got something 'en-XX' like - so for the language just use the first par
      // however it's ok and even required to use the full string for the time
      language = language.split('-')[0];
    }

    return language;
  }

  private parseLuxonLanguage(language: string): any {
    if (language === 'en') {
      return 'en-gb';
    }
    return language;
  }

  private setDefautLuxonLocale(language: string) {
    // luxon settings
    // https://moment.github.io/luxon/docs/manual/intl.html
    Settings.defaultLocale = language;
  }


}
