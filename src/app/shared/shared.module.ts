import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { PrimengModule } from '../primeng/primeng.module';


@NgModule({
  declarations: [
    TopMenuComponent,
    BottomMenuComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    TopMenuComponent,
    BottomMenuComponent,
  ]
})
export class SharedModule { }
