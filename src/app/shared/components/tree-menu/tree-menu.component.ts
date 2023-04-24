import { timer, take } from 'rxjs';
import { Component, Renderer2, RendererFactory2, Inject, OnInit, AfterViewInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { NodeEvent } from '../../interfaces/node-event';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TypingTextComponent } from '../typing-text/typing-text.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.scss'],
  providers: [DialogService]
})
export class TreeMenuComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Output() onSelecting = new EventEmitter<boolean>();
  menuItems!: TreeNode<string[]>[];
  private renderer: Renderer2;

  constructor(
    private router: Router,
    private rendererFactory: RendererFactory2,
    private dialogService: DialogService,
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
            label: 'Desarrollador Móvil',
            data: ['portfolio', 'developer', 'mobile'],
            icon: 'bi bi-phone',
          },
          {
            label: 'Desarrollador Frontend',
            data: ['portfolio', 'developer', 'frontend'],
            icon: 'bi bi-window-fullscreen',
          },
          {
            label: 'Desarrollador Backend',
            data: ['portfolio', 'developer', 'backend'],
            icon: 'bi bi-pc',
          },
        ]
      },
      {
        label: 'Blog',
        icon: 'bi bi-journal-bookmark-fill',
        data: ['blog', 'blog'],
      },
      {
        label: 'Contacto',
        icon: 'bi bi-envelope',
        data: ['contact', 'contact'],
      }
    ];
  }

  ngAfterViewInit(): void {
    this.document.querySelectorAll('.p-tree-filter-icon.pi.pi-search')
      .forEach(element => {
        this.renderer.addClass(element, 'bi');
        this.renderer.addClass(element, 'bi-search');
      });
    this.document.querySelectorAll('button.p-sidebar-close.p-sidebar-icon.p-link')
      .forEach(element => {
        const child = element.querySelector('span.p-sidebar-close-icon.pi.pi-times');
        if (child) {
          this.renderer.removeChild(element, child);
        }
        this.renderer.removeChild(element.parentNode, element);
      })

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
        .then(() => {
          this.onSelecting.emit(false);

          if (base === 'home') {
            return;
          }

          const ref: DynamicDialogRef = this.dialogService.open(TypingTextComponent, {
            header: '¡Inspírate con esta frase filosófica!, esperamos que te guste 🤗',
            draggable: false,
            baseZIndex: 10000,
            resizable: false,
          });

          timer(Number(environment.modalIsDysplayed) * 1000).pipe(
            take(1)
          ).subscribe(() => ref.close());
          
        })
        .catch(() => {
          this.onSelecting.emit(true);
          this.router.navigate(['/'])
        });
    }
  }

}
