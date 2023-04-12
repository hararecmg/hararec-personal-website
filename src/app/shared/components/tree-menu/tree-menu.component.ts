import { Component, Renderer2, RendererFactory2, Inject, OnInit, AfterViewInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { NodeEvent } from '../../interfaces/node-event';

@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.scss']
})
export class TreeMenuComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Output() onSelecting = new EventEmitter<boolean>();
  menuItems!: TreeNode<string[]>[];
  private renderer: Renderer2;

  constructor(
    private router: Router,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Home',
        icon: 'bi bi-house-fill',
        data: ['home', '']
      },
      {
        label: 'Acerca de mi',
        icon: 'bi bi-person-circle',
        expandedIcon: 'bi bi-chevron-right',
        collapsedIcon: 'bi bi-chevron-down',
        children: [
          {
            label: 'Desarrollador',
            icon: 'bi bi-code-slash',
            expandedIcon: 'bi bi-chevron-right',
            collapsedIcon: 'bi bi-chevron-down',
            children: [
              {
                label: 'Frontend',
                data: ['about', 'developer', 'frontend'],
                icon: 'bi bi-window-fullscreen',
                expandedIcon: 'bi bi-chevron-right',
                collapsedIcon: 'bi bi-chevron-down',
              },
              {
                label: 'Backend',
                data: ['about', 'developer', 'backend'],
                icon: 'bi bi-pc',
                expandedIcon: 'bi bi-chevron-right',
                collapsedIcon: 'bi bi-chevron-down',
              },

            ]
          },
          {
            label: 'Matemático',
            icon: 'bi bi-infinity',
            expandedIcon: 'bi bi-chevron-right',
            collapsedIcon: 'bi bi-chevron-down',
            children: [
              {
                label: 'Docente',
                data: ['about', 'mathematician', 'teacher'],
                icon: 'bi bi-journal-bookmark',
              },
              {
                label: 'Investigador',
                data: ['about', 'mathematician', 'researcher'],
                icon: 'bi bi-clipboard-heart-fill',
              },
            ]
          }
        ]
      },
      {
        label: 'Portafolio',
        icon: 'bi bi-pc-display-horizontal',
        expandedIcon: 'bi bi-chevron-right',
        collapsedIcon: 'bi bi-chevron-down',
        children: [
          {
            label: 'Desarrollador Frontend',
            data: ['portfolio', 'frontend'],
            icon: 'bi bi-window-fullscreen',
          },
          {
            label: 'Desarrollador Backend',
            data: ['portfolio', 'backend'],
            icon: 'bi bi-pc',
          },
          {
            label: 'Desarrollador Móvil',
            data: ['portfolio', 'mobile'],
            icon: 'bi bi-phone',
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
    this.document.querySelectorAll('.p-tree-filter-icon.pi.pi-search')
    .forEach(element => {
      this.renderer.addClass(element, 'bi');
      this.renderer.addClass(element, 'bi-search');
    });

  }

  ngAfterViewChecked(): void {
    this.document.querySelectorAll('span.p-tree-toggler-icon.pi-fw')
      .forEach(element => {
        this.renderer.addClass(element, 'bi');
        this.renderer.addClass(element, 'bi-chevron-right');
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

  findRoute(event: NodeEvent) {
    if (event.node['data']) {
      const [base, ...params] = event.node.data;
      this.router.navigate([`/${base}`, ...params])
        .then(() => this.onSelecting.emit(false))
        .catch(() => {
          this.onSelecting.emit(true);
          this.router.navigate(['/'])
        });
    }
  }

}
