import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './shared/services/theme.service';
import { DeviceService } from './shared/services/device.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService,
    private themeService: ThemeService,
    private deviceService: DeviceService,
  ) { 
    this.translate.setDefaultLang('es');
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
