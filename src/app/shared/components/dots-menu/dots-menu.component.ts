import { MenuIcons } from './../../interfaces/menu-icons';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dots-menu',
  templateUrl: './dots-menu.component.html',
  styleUrls: ['./dots-menu.component.scss']
})
export class DotsMenuComponent {

  isActive = false;
  iconsClass: MenuIcons[] = [
    {
      name: 'porfolio',
      class: 'bi bi-pc-display-horizontal',
      x: 1,
      y: 0, 
    },
    {
      name: 'home',
      class: 'bi bi-house-heart-fill',
      x: 0,
      y: -1 
    },
    {
      name: 'blog',
      class: 'bi bi-journal-bookmark-fill',
      x: 0,
      y: 1, 
    },
    {
      name: 'about',
      class: 'bi bi-file-person-fill',
      x: 1,
      y: 1, 
    },
    {
      name: 'search',
      class: 'bi bi-search',
      x: -1,
      y: -1, 
    },
    {
      name: 'facebook',
      class: 'bi bi-facebook',
      x: 0,
      y: 0, 
    },
    {
      name: 'github',
      class: 'bi bi-github',
      x: -1,
      y: 1, 
    },
    {
      name: 'linkedin',
      class: 'bi bi-linkedin',
      x: 1,
      y: -1 
    },
    {
      name: 'twitter',
      class: 'bi bi-twitter',
      x: -1,
      y: 0 
    },
  ];

  toggleMenu() {
    this.isActive = !this.isActive;
  }

}
