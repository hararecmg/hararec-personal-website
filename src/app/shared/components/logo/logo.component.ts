/**
 * Los códigos html y scss de este componente se basan 
 * en el proyecto "css-cards-effects" de "rymbau"
 * disponible en https://github.com/rymbau/css-cards-effects
*
*/

import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  @Input('scale') scale: number = 1;
  isHover: boolean = false;

  isHoverLogo(hover: boolean = false) {
    this.isHover = hover;
  }

  get translationPx(): string {
    return this.isHover ? `${-130 * this.scale}px` : '0px';
  }

  get logoStyles(): { [klass: string]: string } {
    return {
      'width': `${312 * this.scale}px`,
      'height': `${312 * this.scale}px`,
      'border-width': `${15 * this.scale}px`,
    };
  }

}