import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LanguageService } from './shared/services/global/language.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private primengConfig: PrimeNGConfig,
    private language: LanguageService,
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.language.languageConfig('es-ES');
  }
}
