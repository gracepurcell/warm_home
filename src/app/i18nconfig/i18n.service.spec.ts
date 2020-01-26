import { inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomTranslateLoader } from './customtranslateloader.class';
import { getI18nTranslateModuleConfig } from './geti18ntranslatemoduleconfig';
import { I18nService } from './i18n.service';
import { I18nConfigModule } from './i18nconfig.module';

import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestingTools } from '../testing/testingtools.class.spec';

@Component({
  template: `
    <div>{{ 'TR_IN_HTML' | translate:param }}</div>
  `
})
export class TestComponent {
  // from here https://github.com/ngx-translate/core
  param = {value: 'world'};
}


describe('I18nService', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeAll(function() {
    // remove all translations
    CustomTranslateLoader.__reset();
  });

  afterAll(function() {
    // remove all translations
    CustomTranslateLoader.__reset();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nConfigModule,
        TranslateModule.forRoot(getI18nTranslateModuleConfig())
      ],
      declarations: [
        TestComponent
      ],
      providers: [I18nService]
    });
    CustomTranslateLoader.__reset();
  });

  it('should be created', inject([I18nService], (service: I18nService) => {
    expect(service).toBeTruthy();
  }));

  it('should translate a simple text in code', inject(
    [I18nService, TranslateService],
      (service: I18nService, translateService: TranslateService) => {

    const enData = {
      KEY_TO_TEST: TestingTools.randomStringWithLength(255),
    };
    CustomTranslateLoader.append('en', enData);

    const deData = {
      KEY_TO_TEST: TestingTools.randomStringWithLength(255),
    };
    CustomTranslateLoader.append('de', deData);

    service.switchLanguage('en').subscribe(() => {
      expect(translateService.instant('KEY_TO_TEST')).toBe(enData.KEY_TO_TEST);
    });

    service.switchLanguage('de').subscribe(() => {
      expect(translateService.instant('KEY_TO_TEST')).toBe(deData.KEY_TO_TEST);
    });
  }));

  it('should translate a simple text in html', inject([I18nService], (service: I18nService) => {
    // resolves to "<randomstring> world"
    const rnd = TestingTools.randomString();
    const data = {
      TR_IN_HTML: rnd + ' {{value}}',
    };
    CustomTranslateLoader.append('en', data);

    service.switchLanguage('en').subscribe(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const element = fixture.debugElement.query(By.css('div'));
      expect(element.nativeElement.textContent).toContain(rnd + ' world');
    });

  }));

});
