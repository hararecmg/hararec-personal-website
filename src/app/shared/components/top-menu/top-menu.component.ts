import { Component, OnInit, HostListener, Renderer2, RendererFactory2, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DeviceService } from 'src/app/shared/services/global/device.service';
import { Device } from '../../interfaces/device';
import { ThemeService } from '../../services/global/theme.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, AfterViewInit {

  private renderer: Renderer2;
  isScrolled: boolean = false;
  haveViewInited: boolean = false;
  currentTheme: string = '';
  currentPath: string = '';
  userDevice!: Device;
  menuItems!: MenuItem[];
  menuIcons!: NodeListOf<Element>;
  menuTextIcons!: NodeListOf<Element>;

  constructor(
    private device: DeviceService,
    private router: Router,
    private rendererFactory: RendererFactory2,
    private theme: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
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
            label: 'Desarrollador Móvil',
            icon: 'bi bi-phone',
            command: () => this.findRoute('portfolio', 'developer', 'mobile')
          },
          {
            label: 'Desarrollador Frontend',
            icon: 'bi bi-window-fullscreen',
            command: () => this.findRoute('portfolio', 'developer', 'frontend')
          },
          {
            label: 'Desarrollador Backend',
            icon: 'bi bi-pc-display',
            command: () => this.findRoute('portfolio', 'developer', 'backend')
          },
        ]
      },
      {
        label: 'Blog',
        icon: 'bi bi-journal-bookmark-fill',
        command: () => this.findRoute('blog', 'blog')
      },
      {
        label: 'Contacto',
        icon: 'bi bi-envelope',
        command: () => this.findRoute('contact', 'contact')
      }
    ];
    this.theme.themeObserver.subscribe(theme => {
      this.currentTheme = theme;
      if (this.haveViewInited && !this.device.device.isHandset && !this.device.device.isTablet) {
        this.changeMenuItemsColor(this.isScrolled, this.currentPath, theme);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
        if (this.haveViewInited && !this.device.device.isHandset && !this.device.device.isTablet) {
          this.changeMenuItemsColor(this.isScrolled, event.url, this.currentTheme);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.haveViewInited = true;
    this.menuIcons = this.document.querySelectorAll('span.p-menuitem-icon.bi');
    this.menuTextIcons = this.document.querySelectorAll('span.p-menuitem-text');
  }

  findRoute(base: string, ...params: string[]) {

    this.router.navigate([`/${base}`, ...params])
      .catch(() => this.router.navigate(['/']));
  }

  changeMenuItemsColor(scroll: boolean, path: string, theme: string) {

    if (!scroll && path !== '/home' && path !== '/' && theme === 'light') {
      this.menuIcons.forEach(element => {
        this.renderer.setStyle(element, 'color', '#000');
      });
      this.menuTextIcons.forEach(element => {
        this.renderer.setStyle(element, 'color', '#000');
      });
    } else {
      this.menuIcons.forEach(element => {
        this.renderer.setStyle(element, 'color', '#fff');
      });
      this.menuTextIcons.forEach(element => {
        this.renderer.setStyle(element, 'color', '#fff');
      });
    }

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = 0 < window.scrollY;
    if (this.haveViewInited && !this.device.device.isHandset && !this.device.device.isTablet) {
      this.changeMenuItemsColor(this.isScrolled, this.currentPath, this.currentTheme);
    }
  }

}