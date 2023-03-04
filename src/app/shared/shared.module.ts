import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ContactFormComponent } from './components/contact-form/contact-form.component';


@NgModule({
  declarations: [
    TopMenuComponent,
    BottomMenuComponent,
    ContactFormComponent,
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
  ]
})
export class SharedModule { }
