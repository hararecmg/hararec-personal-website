import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeZh from '@angular/common/locales/zh';
import localeHi from '@angular/common/locales/hi';
import localeAr from '@angular/common/locales/ar';
import localeRu from '@angular/common/locales/ru';
import localePt from '@angular/common/locales/pt';
import localeDe from '@angular/common/locales/de';

// Español
registerLocaleData(localeEs);
// Inglés
registerLocaleData(localeEn);
// Francés
registerLocaleData(localeFr);
// Chino
registerLocaleData(localeZh);
// Hindi
registerLocaleData(localeHi);
// Árabe
registerLocaleData(localeAr);
// Ruso
registerLocaleData(localeRu);
// Portugués
registerLocaleData(localePt);
// Alemán
registerLocaleData(localeDe);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
