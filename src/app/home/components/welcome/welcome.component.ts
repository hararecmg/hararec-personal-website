/**
 * Los códigos html y scss de este componente se basan 
 * en el proyecto "splash-transition" de "lmgonzalves"
 * disponible en https://github.com/lmgonzalves/splash-transition
*
*/

import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Device } from 'src/app/shared/interfaces/device';
import { DeviceService } from 'src/app/shared/services/global/device.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  openState: boolean = false;
  userDevice!: Device;
  private destroy$ = new Subject<void>();

  constructor(private device: DeviceService) {}

  ngOnInit() {
    this.userDevice = this.device.device;
    interval(500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.openState = true;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getResponsiveStyles(): {[key: string]: string} {
    return {
      'top-flying-text': this.userDevice.isHandset
        ? '170px'
        : this.userDevice.isTablet
          ? '120px'
          : this.userDevice.isWeb || this.userDevice.isXLarge
            ? '100px'
            : '200px',
      'text-align-flying-text': this.userDevice.isHandset || this.userDevice.isTablet
        ? 'center'
        : this.userDevice.isWeb || this.userDevice.isXLarge
            ? 'left'
            : 'center',
      'padding-flying-text': this.userDevice.isHandset || this.userDevice.isTablet
        ? '35px'
        : this.userDevice.isWeb
            ? '100px'
            : this.userDevice.isXLarge
              ? '200px'
              : 'auto',
      'width-flying-text': this.userDevice.isHandset || this.userDevice.isTablet
        ? '100%'
        : this.userDevice.isWeb || this.userDevice.isXLarge
            ? '60%'
            : '100%',
      'font-size-flying-text': this.userDevice.isHandset
      ? '3rem'
      : this.userDevice.isTablet
        ? '3.5rem'
        : this.userDevice.isWeb
          ? '4.5rem'
          : this.userDevice.isXLarge
            ? '7.5rem'
            : '3.5rem',
      'width-photo': this.userDevice.isHandset
      ? '90vw'
      : this.userDevice.isTablet
        ? '75vw'
        : this.userDevice.isWeb || this.userDevice.isXLarge
          ? '40vw'
          : '100vw', 
      'min-height-photo': this.userDevice.isHandset
      ? '40vh'
      : this.userDevice.isTablet
        ? '60vh'
        : this.userDevice.isWeb || this.userDevice.isXLarge
          ? 'calc(100vh - 100px)'
          : '40vh', 
      'left-scroll-bottom': this.userDevice.isHandset || this.userDevice.isTablet
      ? '10%'
      : this.userDevice.isWeb || this.userDevice.isXLarge
          ? '50%'
          : '10%', 
    }
  }

}
