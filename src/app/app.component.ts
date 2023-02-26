import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ThemeService } from './shared/services/global/theme.service';
import { DeviceService } from './shared/services/global/device.service';
import { LanguageService } from './shared/services/global/language.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private themeService: ThemeService,
    private deviceService: DeviceService,
    private language: LanguageService,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.language.languageConfig('es-ES');
  }
}
