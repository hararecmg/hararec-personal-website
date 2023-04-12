import { Component, OnInit } from '@angular/core';
import { Device } from '../../interfaces/device';
import { DeviceService } from '../../services/global/device.service';


@Component({
  selector: 'app-canvas-menu',
  templateUrl: './canvas-menu.component.html',
  styleUrls: ['./canvas-menu.component.scss']
})
export class CanvasMenuComponent implements OnInit {

  isVisible: boolean = false;
  userDevice!: Device;

  constructor(private device: DeviceService) {}

  ngOnInit(): void {
    this.userDevice = this.device.device;
  }

  toggleMenu(value: boolean = false) {
    this.isVisible = value;
  }

}
