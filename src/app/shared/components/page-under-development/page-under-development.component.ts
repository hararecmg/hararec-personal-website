import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { PexelService } from '../../services/global/pexel.service';
import { Subscription, filter, switchMap, take } from 'rxjs';
import { PexelResponse } from '../../interfaces/pexel';
import { DeviceService } from '../../services/global/device.service';

@Component({
  selector: 'app-page-under-development',
  templateUrl: './page-under-development.component.html',
  styleUrls: ['./page-under-development.component.scss']
})
export class PageUnderDevelopmentComponent implements OnInit, OnDestroy {

  currentPath: string = '';
  isLoading: boolean = true;
  pexelSubs!: Subscription;
  pexelsImages!: PexelResponse;

  constructor(
    private location: Location,
    private router: Router,
    private pexels: PexelService,
    private device: DeviceService,
  ) { }

  ngOnInit(): void {

    this.pexels.searchPhotos({
      end_point: 'search',
      pexel_request: {
        query: this.queryText,
        per_page: 1,
      }
    })
      .pipe(take(1))
      .subscribe(resp => {
        console.log(resp);
        this.isLoading = false;
        this.pexelsImages = resp;
      });

    this.pexelSubs = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(event => {

        const filteredEvent = event as NavigationEnd;
        this.currentPath = filteredEvent.url || this.router.url;

        return this.pexels.searchPhotos({
          end_point: 'search',
          pexel_request: {
            query: this.queryText,
            per_page: 1,
          }
        })
      })
    ).subscribe(resp => this.pexelsImages = resp);
  }

  ngOnDestroy(): void {
    this.pexelSubs.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  get queryText(): string {
    const url = this.currentPath || this.router.url;
    return url.split('/').slice(2).join(' ');
  }

  get imageAttributes(): { [key: string]: string } {
    return {
      'src': this.device.device.isHandset || this.device.device.isTablet
        ? `url(${this.pexelsImages.photos[0].src.portrait})`
        : `url(${this.pexelsImages.photos[0].src.original})`,
      'photographer': this.pexelsImages.photos[0].photographer,
      'photographer_url': this.pexelsImages.photos[0].photographer_url,
    };
  }

  get scrollBottonPosition(): { [key: string]: string } {
    return {
      'bottom': this.device.device.isHandset || this.device.device.isTablet
        ? '50%'
        : '30%',
      'left': this.device.device.isHandset
        ? '10%'
        : '5%',
    };
  }

}
