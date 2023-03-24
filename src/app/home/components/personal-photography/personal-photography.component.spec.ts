import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPhotographyComponent } from './personal-photography.component';

describe('PersonalPhotographyComponent', () => {
  let component: PersonalPhotographyComponent;
  let fixture: ComponentFixture<PersonalPhotographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalPhotographyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalPhotographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
