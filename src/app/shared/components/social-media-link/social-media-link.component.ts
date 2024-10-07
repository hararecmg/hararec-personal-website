import { Component } from '@angular/core';
import { SocialMedia } from '../../interfaces/social-media';

@Component({
  selector: 'app-social-media-link',
  templateUrl: './social-media-link.component.html',
  styleUrls: ['./social-media-link.component.scss']
})
export class SocialMediaLinkComponent {

  links: SocialMedia[] = [
    {
      url: 'https://github.com/hararec-dev',
      tooltip: 'github',
      icon: 'bi bi-github',
      button_class: 'p-button-success'
    },
    {
      url: 'https://www.linkedin.com/in/hararec-dev',
      tooltip: 'linkedin',
      icon: 'bi bi-linkedin',
      button_class: 'p-button-warning'
    },
    {
      url: 'https://www.twitter.com/hararec_dev',
      tooltip: 'twitter',
      icon: 'bi bi-twitter',
      button_class: 'p-button-info'
    },
    {
      url: 'https://www.facebook.com/hararec.medinagonzalez',
      tooltip: 'facebook',
      icon: 'bi bi-facebook',
      button_class: ''
    },
  ];

}
