import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private isHandset$: Observable<boolean>;
  private isTablet$: Observable<boolean>;
  private isWeb$: Observable<boolean>;
  private renderer: Renderer2;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    this.isTablet$ = this.breakpointObserver.observe(Breakpoints.Tablet)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    this.isWeb$ = this.breakpointObserver.observe(Breakpoints.Web)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    this.detectDeviceType();
  }

  detectDeviceType() {
    this.isHandset$.subscribe(event => {
      this.renderer.setAttribute(this.document.documentElement, 'data-device', 'mobile');
    });
    this.isTablet$.subscribe(event => {
      this.renderer.setAttribute(this.document.documentElement, 'data-device', 'tablet');
    });
    this.isWeb$.subscribe(event => {
      this.renderer.setAttribute(this.document.documentElement, 'data-device', 'web');
    });
  }
}
