import { BrowserModule } from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER, LOCALE_ID} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {I18NEXT_SERVICE, I18NextLoadResult, I18NextModule, ITranslationService} from 'angular-i18next';
import * as XHR from 'i18next-xhr-backend';
import * as i18nextLanguageDetector from 'i18next-browser-languagedetector';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { routing } from "./app.routing";
import { PagerService } from './_services';
import { AppConfig }       from './app.config';

/*
 * Platform and Environment providers/directives/pipes
 */
const i18nextOptions = {
  fallbackLng: 'en',
  debug: false, // set debug?
  returnEmptyString: false,
  interpolation: {
    format: I18NextModule.interpolationFormat()
  },
  backend: {
    loadPath: '/assets/locales/{{lng}}/{{ns}}.json'
  },
};

export function appInit(i18next: ITranslationService) {
  return () => {
    let promise: Promise<I18NextLoadResult> = i18next
      .use(XHR)
      .use(i18nextLanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent
  ],
  imports: [
    I18NextModule.forRoot(),
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    routing,
  ],
  providers: [
    PagerService,
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
    I18N_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
