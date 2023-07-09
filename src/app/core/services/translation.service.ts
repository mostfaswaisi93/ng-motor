import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Locale {
  lang: string;
  data: Object;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private langIds: any = [];

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
  }

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];
    locales.forEach((locale) => {
      this.translate.setTranslation(locale.lang, locale.data, true);
      this.langIds.push(locale.lang);
    });
    this.translate.addLangs(this.langIds);
  }

  setLanguage(lang?) {
    if (!lang) {
      lang = localStorage.getItem('language') || this.translate.getDefaultLang();
    }

    this.translate.use(lang);
    localStorage.setItem('language', lang);

    if (lang !== 'ar') {
      document.getElementsByTagName('html')[0].setAttribute('lang', lang);
      document.getElementsByTagName('html')[0].setAttribute('direction', 'ltr');
      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      document.getElementsByTagName('html')[0].setAttribute('style', 'direction: ltr');
    } else {
      document.getElementsByTagName('html')[0].setAttribute('lang', lang);
      document.getElementsByTagName('html')[0].setAttribute('direction', 'rtl');
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      document.getElementsByTagName('html')[0].setAttribute('style', 'direction: rtl');
    }
  }

  getSelectedLanguage(): any {
    return localStorage.getItem('language') || this.translate.getDefaultLang();
  }

}
