import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DeviceService } from 'src/app/shared/services/global/device.service';
import { Device } from '../../interfaces/device';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  isScrolled: boolean = false;
  userDevice!: Device;
  menuItems!: MenuItem[];

  constructor(
    private device: DeviceService,
    private router: Router,
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = 0 < window.scrollY;
  }

  ngOnInit(): void {
    this.userDevice = this.device.device;
    this.menuItems = [
      {
        label: 'Acerca de mi',
        icon: 'bi bi-person-circle',
        items: [
          {
            label: 'Desarrollador',
            icon: 'bi bi-code-slash',
            items: [
              {
                label: 'Frontend',
                icon: 'bi bi-window-fullscreen',
                command: () => this.findRoute('about', 'developer', 'frontend')
              },
              {
                label: 'Backend',
                icon: 'bi bi-pc-display',
                command: () => this.findRoute('about', 'developer', 'backend')
              },

            ]
          },
          {
            label: 'Matemático',
            icon: 'bi bi-infinity',
            items: [
              {
                label: 'Docente',
                icon: 'bi bi-journal-bookmark',
                command: () => this.findRoute('about', 'mathematician', 'teacher')
              },
              {
                label: 'Investigador',
                icon: 'bi bi-clipboard-heart-fill',
                command: () => this.findRoute('about', 'mathematician', 'researcher')
              },
            ]
          }
        ]
      },
      {
        label: 'Portafolio',
        icon: 'bi bi-pc-display-horizontal',
        items: [
          {
            label: 'Desarrollador Frontend',
            icon: 'bi bi-window-fullscreen',
            command: () => this.findRoute('portfolio', 'frontend')
          },
          {
            label: 'Desarrollador Backend',
            icon: 'bi bi-pc-display',
            command: () => this.findRoute('portfolio', 'backend')
          },
          {
            label: 'Desarrollador Móvil',
            icon: 'bi bi-phone',
            command: () => this.findRoute('portfolio', 'mobile')
          },
        ]
      },
      {
        label: 'Blog',
        icon: 'bi bi-journal-bookmark-fill',
      },
      {
        label: 'Contacto',
        icon: 'bi bi-envelope'
      }
    ];
  }

  findRoute(base: string, ...params: string[]) {

    this.router.navigate([`/${base}`, ...params])
      .then(() => console.log(this.router.url.split(/\\|\//)[1]))
      .catch(() => this.router.navigate(['/']));
  }

}