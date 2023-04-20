import { Device } from 'src/app/shared/interfaces/device';
import { DeviceService } from './../../../shared/services/global/device.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-bottom',
  templateUrl: './scroll-bottom.component.html',
  styleUrls: ['./scroll-bottom.component.scss']
})
export class ScrollBottomComponent implements OnInit {

  @Input() bottom: string = '15%';
  @Input() left: string = '50%';
  @Input() sizes: number = 5;
  // @Input() fontSize: number = 2.5;
  userDevice!: Device;

  constructor(private device: DeviceService) {}

  ngOnInit(): void {
    this.userDevice = this.device.device;
  }

  getCssValues(): {[key: string]: string} {
    return {
      'bottom': this.bottom,
      'left': this.left,
      'sizes': `${this.sizes}px`,
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
