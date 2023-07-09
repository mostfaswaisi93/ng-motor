import { Component } from '@angular/core';
import { locale as enLang } from './core/i18n/en';
import { locale as arLang } from './core/i18n/ar';
import { TranslationService } from './core/services/translation.service';
import { AuthService } from './core/services/auth.service';
import { CustomLoaderComponent } from './views/shared/custom-loader/custom-loader.component';
import { SplashScreenService } from './core/services/splash-screen.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'motor-fe';
  public customLoaderComponent = CustomLoaderComponent;
  private unsubscribe: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private translationService: TranslationService,
    public splashScreenService: SplashScreenService
  ) {
    this.translationService.loadTranslations(enLang, arLang);
    this.translationService.setLanguage(this.translationService.getSelectedLanguage());
    this.authService.checkLogin();
  }

  ngOnInit() {
    const routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.splashScreenService.hide();
        window.scrollTo(0, 0);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

}
