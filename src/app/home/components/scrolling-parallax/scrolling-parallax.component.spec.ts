import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingParallaxComponent } from './scrolling-parallax.component';

describe('ScrollingParallaxComponent', () => {
  let component: ScrollingParallaxComponent;
  let fixture: ComponentFixture<ScrollingParallaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollingParallaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollingParallaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
