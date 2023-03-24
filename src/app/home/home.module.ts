import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../primeng/primeng.module';
import { ScrollingParallaxComponent } from './components/scrolling-parallax/scrolling-parallax.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ScrollBottomComponent } from './components/scroll-bottom/scroll-bottom.component';
import { PersonalPhotographyComponent } from './components/personal-photography/personal-photography.component';


@NgModule({
  declarations: [
    HomeComponent,
    ScrollingParallaxComponent,
    WelcomeComponent,
    ScrollBottomComponent,
    PersonalPhotographyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    PrimengModule,
  ]
})
export class HomeModule { }
