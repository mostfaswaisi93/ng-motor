import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {
  showSideMenu = false;
  showProfileHeader = false;
  @Output() showSideMenuEmit = new EventEmitter<boolean>();
  @Output() showProfileHeaderEmit = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  toggleHeader() {
    this.showSideMenu = !this.showSideMenu
    this.showSideMenuEmit.emit(this.showSideMenu);
  }

  toggleProfileHeader() {
    this.showProfileHeader = !this.showProfileHeader;
    this.showProfileHeaderEmit.emit(this.showProfileHeader);
  }

}
