import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  showSideMenu = false;
  showProfileMenu = false;
  closeAsidePage = false;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  closePage(e) {
    this.closeAsidePage = e;
  }

}
