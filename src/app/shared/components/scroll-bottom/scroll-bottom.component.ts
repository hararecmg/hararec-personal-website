import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Device } from 'src/app/shared/interfaces/device';
import { DeviceService } from './../../../shared/services/global/device.service';
import { ThemeService } from '../../services/global/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scroll-bottom',
  templateUrl: './scroll-bottom.component.html',
  styleUrls: ['./scroll-bottom.component.scss']
})
export class ScrollBottomComponent implements OnInit, OnDestroy {

  @Input() bottom: string = '15%';
  @Input() left: string = '50%';
  @Input() sizes: number = 5;
  currentTheme: string = '';
  currentPath: string = '';
  color: string = '#FFFFFF';
  themeSuscription!: Subscription;
  routerSuscription!: Subscription;
  userDevice!: Device;

  constructor(
    private device: DeviceService,
    private theme: ThemeService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.currentTheme = this.theme.theme;
    this.currentPath = this.router.url;
    this.userDevice = this.device.device;
    this.themeSuscription = this.theme.themeObserver
    .subscribe(theme => {
      this.currentTheme = theme;
      this.changColor(this.currentPath, theme);
    });
    this.routerSuscription = this.router.events
    .subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
        this.changColor(event.url, this.currentTheme);
      }
    })
  }
  
  ngOnDestroy(): void {
    this.themeSuscription.unsubscribe();
    this.routerSuscription.unsubscribe();
  }
  
  changColor(path: string, theme: string) {
    path !== '/home' && path !== '/' && theme === 'light'
      ? this.color = '#000'
      : this.color = '#fff';
  }

  get cssValues(): {[key: string]: string} {
    return {
      'bottom': this.bottom,
      'left': this.left,
      'sizes': `${this.sizes}px`,
      'color': this.color,
      'font-size': this.userDevice.isHandset
        ? '2.5rem'
        : this.userDevice.isTablet
          ? '3rem'
          : this.userDevice.isWeb 
            ? '3.5rem'
            : this.userDevice.isXLarge
            ? '4.5rem'
            : '3.5rem'
    }
  }

}
