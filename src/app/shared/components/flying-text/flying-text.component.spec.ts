import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyingTextComponent } from './flying-text.component';

describe('FlyingTextComponent', () => {
  let component: FlyingTextComponent;
  let fixture: ComponentFixture<FlyingTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlyingTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
