import { Component, OnInit, Renderer2, RendererFactory2, Inject, AfterViewChecked, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MenuItem, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, AfterViewInit, AfterViewChecked {

  items: MenuItem[] = [];
  value: string = '';
  val: number = 4;
  files!: TreeNode<string>[];
  elements!: NodeListOf<Element>;
  displayMaximizable: boolean = false;
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  selec(event: PointerEvent): void {
    console.log(event);
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  ngOnInit(): void {
    this.files = [
      {
        label: 'Documents',
        data: 'Documents Folder',
        expandedIcon: 'bi bi-chat-right-heart',
        collapsedIcon: 'bi bi-chat-square-dots',
        children: [
          {
            label: 'Work',
            data: 'Work Folder',
            expandedIcon: 'bi bi-chevron-right',
            collapsedIcon: 'bi bi-chevron-down',
            children: [
              {
                label: 'Expenses.doc',
                icon: 'bi bi-clipboard',
                data: 'Expenses Document'
              },
              {
                label: 'Resume.doc',
                icon: 'bi bi-clipboard-heart',
                data: 'Resume Document'
              }
            ]
          },
          {
            label: 'Home',
            data: 'Home Folder',
            expandedIcon: 'bi bi-clock',
            collapsedIcon: 'bi bi-cloud-arrow-up',
            children: [
              {
                label: 'Invoices.txt',
                icon: 'pi pi-file',
                data: 'Invoices for this month'
              }
            ]
          }
        ]
      },
      {
        label: 'Pictures',
        data: 'Pictures Folder',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            label: 'barcelona.jpg',
            icon: 'pi pi-image',
            data: 'Barcelona Photo'
          },
          {
            label: 'logo.jpg',
            icon: 'pi pi-file',
            data: 'PrimeFaces Logo'
          },
          {
            label: 'primeui.png',
            icon: 'pi pi-image',
            data: 'PrimeUI Logo'
          }
        ]
      },
      {
        label: 'Movies',
        data: 'Movies Folder',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            label: 'Al Pacino',
            data: 'Pacino Movies',
            children: [
              {
                label: 'Scarface',
                icon: 'pi pi-video',
                data: 'Scarface Movie'
              },
              {
                label: 'Serpico',
                icon: 'pi pi-file-video',
                data: 'Serpico Movie'
              }
            ]
          },
          {
            label: 'Robert De Niro',
            data: 'De Niro Movies',
            children: [
              {
                label: 'Goodfellas',
                icon: 'pi pi-video',
                data: 'Goodfellas Movie'
              },
              {
                label: 'Untouchables',
                icon: 'pi pi-video',
                data: 'Untouchables Movie'
              }
            ]
          }
        ]
      }
    ];
    this.items = [
      {
        label: 'File',
        icon: 'bi bi-file-earmark',
        items: [
          {
            label: 'New',
            icon: 'bi bi-plus-circle',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video'
              },

            ]
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          },

        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',

          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',

          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              },

            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
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
}