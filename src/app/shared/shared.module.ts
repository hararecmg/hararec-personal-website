import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { DotsMenuComponent } from './components/dots-menu/dots-menu.component';
import { LogoComponent } from './components/logo/logo.component';


@NgModule({
  declarations: [
    TopMenuComponent,
    BottomMenuComponent,
    ContactFormComponent,
    DotsMenuComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
  ],
  exports: [
    TopMenuComponent,
    BottomMenuComponent,
    ContactFormComponent,
    DotsMenuComponent,
  ]
})
export class SharedModule { }
