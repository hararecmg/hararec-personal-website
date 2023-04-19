import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme: string = '';
  private renderer: Renderer2;
  private themeSubject = new BehaviorSubject<string>(this._theme);

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
    this._theme = theme;
    this.renderer.setAttribute(this.document.documentElement, 'data-theme', this._theme);
    localStorage.setItem('theme', this._theme);
    this.themeSubject.next(this._theme);
  }

  private getBrowserTheme(): string {
    return this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  get theme(): string {
    return this._theme;
  }

  get themeObserver(): BehaviorSubject<string> {
    return this.themeSubject;
  }
}
