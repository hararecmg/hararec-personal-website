import { Component, AfterViewInit, Input } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-personal-photography',
  templateUrl: './personal-photography.component.html',
  styleUrls: ['./personal-photography.component.scss']
})
export class PersonalPhotographyComponent implements AfterViewInit {

  @Input('width') width: string = '40vw';
  @Input('minHeight') minHeight: string = 'calc(100vh - 100px)';

  ngAfterViewInit(): void {
    gsap.from(".photo", {
      duration: 1.5, 
      opacity: 0, 
      x: 400,
      delay: 3, 
      stagger: 0.1,
      ease: "power4.out"
    });
  }

}
