/**
 * Los códigos html y scss de este componente se basan 
 * en el proyecto "ParallaxScrolling" de "DavidThomas358"
 * disponible en https://github.com/DavidThomas358/ParallaxScrolling
*
*/

import { Component, OnInit, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DeviceService } from './../../../shared/services/global/device.service';
import { PexelResponse } from './../../../shared/interfaces/pexel';
import { PexelService } from './../../../shared/services/global/pexel.service';
import { DotsMenuComponent } from './../../../shared/components/dots-menu/dots-menu.component';
import { ParallaxItem } from './../../interfaces/parallax-item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scrolling-parallax',
  templateUrl: './scrolling-parallax.component.html',
  styleUrls: ['./scrolling-parallax.component.scss']
})
export class ScrollingParallaxComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = true;
  pexelSubs!: Subscription;
  pexelsImages!: PexelResponse;
  parallaxItems: ParallaxItem[] = [
    {
      title: 'Home',
      subtitle: 'Home Page',
      component: DotsMenuComponent,
    },
    {
      title: 'Body',
      subtitle: 'Body Page',
      component: DotsMenuComponent,
    },
    {
      title: 'Footer',
      subtitle: 'Footer Page',
      component: DotsMenuComponent,
    },
  ];

  constructor(
    private device: DeviceService,
    private pexels: PexelService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.pexelSubs = this.pexels.searchPhotos({
      end_point: 'curated',
      pexel_request: {
        // query: 'naturally',
        per_page: this.parallaxItems.length,
      }
    }).subscribe(resp => {
      this.pexelsImages = resp;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    const reveal = this.document.querySelectorAll('.reveal');
    const contents = this.document.querySelectorAll('.content-component');

    reveal.forEach(text => ScrollTrigger.create({
      trigger: text,
      toggleClass: 'active',
      start: "top 100%",
      end: "top 20%",
    })
    );
    contents.forEach(content => ScrollTrigger.create({
      trigger: content,
      toggleClass: 'active',
      start: "top 100%",
      end: "top 20%",
    })
    );
  }

  ngOnDestroy(): void {
    this.pexelSubs.unsubscribe();
  }

  getPropertiesByIndex(index: number): { [key: string]: string } {
    let urlImage = '';

    if (this.device.device.isHandset) {
      urlImage = this.pexelsImages.photos[index].src.portrait;
    }

    if (this.device.device.isTablet) {
      urlImage = this.pexelsImages.photos[index].src.medium
    }

    if (this.device.device.isWeb) {
      urlImage = this.pexelsImages.photos[index].src.landscape
    }

    return {
      'class': `parallax-item-${this.parallaxItems[index].title}`,
      'background': `url(${urlImage})`,
      'photographer': this.pexelsImages.photos[index].photographer,
      'photographer_url': this.pexelsImages.photos[index].photographer_url
    };
  }
}