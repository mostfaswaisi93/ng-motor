import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-user',
  templateUrl: './base-user.component.html',
  styleUrls: ['./base-user.component.scss']
})
export class BaseUserComponent implements OnInit {

  closeAsidePage = false;

  constructor() { }

  ngOnInit(): void {
  }

  closePage(e) {
    this.closeAsidePage = e;
  }

}
