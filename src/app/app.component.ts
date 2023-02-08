import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, MegaMenuItem } from 'primeng/api';
import { ThemeService } from './shared/services/theme.service';
import { DeviceService } from './shared/services/device.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  items: MegaMenuItem[] = [];

  constructor(
    private primengConfig: PrimeNGConfig,
    private themeService: ThemeService,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
