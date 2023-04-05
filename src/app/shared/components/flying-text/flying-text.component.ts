import { Component, AfterViewInit, Input } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-flying-text',
  templateUrl: './flying-text.component.html',
  styleUrls: ['./flying-text.component.scss']
})
export class FlyingTextComponent implements AfterViewInit {

  @Input('text') text: string = 'Hello, world!';
  @Input('top') top: string = '0';
  @Input('left') left: string = '0';
  @Input('textAlign') textAlign: string = 'center';
  @Input('width') width: string = '100%';
  @Input('minHeight') minHeight: string = 'auto';
  @Input('background') background: string = 'transparent';
  @Input('padding') padding: string = 'auto';
  @Input('fontSize') fontSize: string = '2.5rem';
  @Input('delay') delay: string = '2.5';

  ngAfterViewInit() {
    const words = gsap.utils.toArray('.word');
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      delay: parseFloat(this.delay),
    })

    tl.set('.text', {
      perspective: 400,
    });
    tl.from(words, {
      duration: 1.5,
      opacity: 0,
      x: gsap.utils.random(-300, 300, true),
      y: gsap.utils.random(50, 300, true),
      z: gsap.utils.random(0, 300, true),
      rotate: gsap.utils.random(-90, 90, true),
      scale: 0.1,
      stagger: {
        amount: 3
      },
      onComplete: function () {
        tl.pause();
      }
    })
  }

  get textArray(): string[] {
    return this.text.replace(/\/(.*)\//g, '').trim().split(' ');
  }

}
