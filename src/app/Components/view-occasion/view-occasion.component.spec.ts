import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOccasionComponent } from './view-occasion.component';

describe('ViewOccasionComponent', () => {
  let component: ViewOccasionComponent;
  let fixture: ComponentFixture<ViewOccasionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOccasionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOccasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
