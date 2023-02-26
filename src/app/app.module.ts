import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ApiInterceptorService } from './shared/services/interceptors/api-interceptor.service';
import { CacheInterceptorService } from './shared/services/interceptors/cache-interceptor.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeZh from '@angular/common/locales/zh';
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
// Ruso
registerLocaleData(localeRu);
// Portugués
registerLocaleData(localePt);
// Alemán
registerLocaleData(localeDe);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: CacheInterceptorService, 
      multi: true 
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ApiInterceptorService, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
