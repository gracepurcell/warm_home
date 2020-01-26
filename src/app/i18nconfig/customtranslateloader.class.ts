import { Observable } from 'rxjs/internal/Observable';
import { TranslateLoader } from '@ngx-translate/core';
import { I18nService } from './i18n.service';

// idea taken from here: https://gist.github.com/ocombe/593d21598d988bf6a8609ba5fc00b67e

export class CustomTranslateLoader implements TranslateLoader {
  public static i18nService: I18nService = null;

  // ["en"]["foo.bar"] = "what ever"
  // ["de"]["foo.bar"] = "was auch immer"
  private static langMap: any = {};

  public static append(lang: string, data: any) {
    if (lang == null || lang === undefined) {
      return;
    }
    if (data == null || data === undefined) {
      return;
    }

    if (CustomTranslateLoader.langMap.hasOwnProperty(lang)) {
      // we need to merge
      // https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
      // tslint:disable-next-line:forin
      for (const attrname in data) {
        CustomTranslateLoader.langMap[lang][attrname] = data[attrname];
      }
    } else {
      CustomTranslateLoader.langMap[lang] = data;
    }

    if (CustomTranslateLoader.i18nService) {
      CustomTranslateLoader.i18nService.reloadLang();
    }
  }

  /**
   * this is only used in testing
   *
   * it will totally mess in production!
   */
  public static __reset() {
    CustomTranslateLoader.langMap = {};
  }

  // TranslateLoader interface
  public getTranslation(lang: string): Observable<any> {
    return new Observable(observer => {
      let result = {};
      if (CustomTranslateLoader.langMap.hasOwnProperty(lang)) {
        result = CustomTranslateLoader.langMap[lang];
      }
      observer.next(result);
      observer.complete();
    });
  }
}
