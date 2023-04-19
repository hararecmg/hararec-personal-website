import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-under-development',
  templateUrl: './page-under-development.component.html',
  styleUrls: ['./page-under-development.component.scss']
})
export class PageUnderDevelopmentComponent {

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }

}
