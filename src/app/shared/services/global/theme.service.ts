import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme: string = '';
  private renderer: Renderer2;

  constructor(
    private mediaMatcher: MediaMatcher,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.setTheme(localStorage.getItem('theme') || this.getBrowserTheme());
  }

  toggleTheme() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  private setTheme(theme: string) {
    this.theme = theme;
    this.renderer.setAttribute(this.document.documentElement, 'data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  private getBrowserTheme(): string {
    return this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
