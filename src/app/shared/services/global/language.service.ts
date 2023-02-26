import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../types/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languages: Language[] = [
    'de-DE',
    'en-US',
    'es-ES',
    'fr-FR',
    'pt-BR',
    'ru-RU',
    'zh-TW',
  ];

  constructor(private translate: TranslateService) { }

  languageConfig(language: Language) {
    const browserLang = this.translate.getBrowserLang() as Language || '';
    this.translate.setDefaultLang(language);
    this.translate.use(
      this.languages.includes(browserLang)
        ? browserLang
        : language
    );
  }

  changeLanguage(language: Language) {
    this.translate.use(language);
  }
}
