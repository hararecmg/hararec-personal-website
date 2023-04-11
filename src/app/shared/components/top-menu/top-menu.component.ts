import { Component, OnInit, Renderer2, RendererFactory2, Inject, AfterViewChecked, AfterViewInit, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/shared/services/global/device.service';
import { MenuItem } from 'primeng/api';
import { Device } from '../../interfaces/device';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, AfterViewInit, AfterViewChecked {

  menuItems: MenuItem[] = [];
  themeName: string = '';
  value: string = '';
  val: number = 4;
  // files!: TreeNode<string>[];
  isActive: boolean = false;
  isScrolled: boolean = false;
  elements!: NodeListOf<Element>;
  userDevice!: Device;
  displayMaximizable: boolean = false;
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private device: DeviceService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = 0 < window.scrollY;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
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

  ngAfterViewInit(): void {
    this.elements = this.document.querySelectorAll('span.p-tree-toggler-icon.pi-fw');
    this.elements.forEach(element => {
      this.renderer.addClass(element, 'bi');
      this.renderer.addClass(element, 'bi-chevron-right');
    });
  }

  ngAfterViewChecked(): void {
    this.elements.forEach(element => {
      if (element.className.includes('pi-chevron-right')) {
        this.renderer.removeClass(element, 'bi-chevron-down');
        this.renderer.addClass(element, 'bi-chevron-right');
      }
      if (element.className.includes('pi-chevron-down')) {
        this.renderer.removeClass(element, 'bi-chevron-right');
        this.renderer.addClass(element, 'bi-chevron-down');
      }
    });
  }

  changeMenuActive(seconds: number) {
    !this.isActive
      ? this.isActive = true
      : setTimeout(() => {
        this.isActive = false;
      }, seconds * 1000);
  }

  findRoute(base: string, ...params: string[]) {

    this.router.navigate([`/${base}`, ...params])
      .then(() => console.log(this.router.url.split(/\\|\//)[1]))
      .catch(() => this.router.navigate(['']));
  }

}
        // this.files = [
        //   {
        //     label: 'Documents',
        //     data: 'Documents Folder',
        //     expandedIcon: 'bi bi-chat-right-heart',
        //     collapsedIcon: 'bi bi-chat-square-dots',
        //     children: [
        //       {
        //         label: 'Work',
        //         data: 'Work Folder',
        //         expandedIcon: 'bi bi-chevron-right',
        //         collapsedIcon: 'bi bi-chevron-down',
        //         children: [
        //           {
        //             label: 'Expenses.doc',
        //             icon: 'bi bi-clipboard',
        //             data: 'Expenses Document'
        //           },
        //           {
        //             label: 'Resume.doc',
        //             icon: 'bi bi-clipboard-heart',
        //             data: 'Resume Document'
        //           }
        //         ]
        //       },
        //       {
        //         label: 'Home',
        //         data: 'Home Folder',
        //         expandedIcon: 'bi bi-clock',
        //         collapsedIcon: 'bi bi-cloud-arrow-up',
        //         children: [
        //           {
        //             label: 'Invoices.txt',
        //             icon: 'pi pi-file',
        //             data: 'Invoices for this month'
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     label: 'Pictures',
        //     data: 'Pictures Folder',
        //     expandedIcon: 'pi pi-folder-open',
        //     collapsedIcon: 'pi pi-folder',
        //     children: [
        //       {
        //         label: 'barcelona.jpg',
        //         icon: 'pi pi-image',
        //         data: 'Barcelona Photo'
        //       },
        //       {
        //         label: 'logo.jpg',
        //         icon: 'pi pi-file',
        //         data: 'PrimeFaces Logo'
        //       },
        //       {
        //         label: 'primeui.png',
        //         icon: 'pi pi-image',
        //         data: 'PrimeUI Logo'
        //       }
        //     ]
        //   },
        //   {
        //     label: 'Movies',
        //     data: 'Movies Folder',
        //     expandedIcon: 'pi pi-folder-open',
        //     collapsedIcon: 'pi pi-folder',
        //     children: [
        //       {
        //         label: 'Al Pacino',
        //         data: 'Pacino Movies',
        //         children: [
        //           {
        //             label: 'Scarface',
        //             icon: 'pi pi-video',
        //             data: 'Scarface Movie'
        //           },
        //           {
        //             label: 'Serpico',
        //             icon: 'pi pi-file-video',
        //             data: 'Serpico Movie'
        //           }
        //         ]
        //       },
        //       {
        //         label: 'Robert De Niro',
        //         data: 'De Niro Movies',
        //         children: [
        //           {
        //             label: 'Goodfellas',
        //             icon: 'pi pi-video',
        //             data: 'Goodfellas Movie'
        //           },
        //           {
        //             label: 'Untouchables',
        //             icon: 'pi pi-video',
        //             data: 'Untouchables Movie'
        //           }
        //         ]
        //       }
        //     ]
        //   }
        // ];