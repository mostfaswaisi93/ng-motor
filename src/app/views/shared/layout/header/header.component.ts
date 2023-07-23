import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ADMIN_HOME_PAGE } from 'src/app/core/enum/constant';
import { TranslationService } from 'src/app/core/services';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideMenuEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() openProfileMenu: boolean;
  isSideMenuClosed = false;
  header = '';
  show = false;
  firstName: any;
  lastName: any;

  constructor(
    private router: Router,
    public authService: AuthService,
    public translateService: TranslateService,
    public translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.toggleSideMenuEmit.emit(this.isSideMenuClosed);
    this.firstName = this.authService?.user?.data?.firstName;
    this.lastName = this.authService?.user?.data?.lastName;
  }

  setLang() {
    this.translationService.set(this.translateService.currentLang === 'ar' ? 'en' : 'ar');
  }

  toggleSideMenu() {
    this.isSideMenuClosed = !this.isSideMenuClosed;
    this.toggleSideMenuEmit.emit(this.isSideMenuClosed);
  }

  logout() {
    this.authService.reomveAuth();
  }

  goToHome() {
    this.router.navigateByUrl(ADMIN_HOME_PAGE);
  }

}
