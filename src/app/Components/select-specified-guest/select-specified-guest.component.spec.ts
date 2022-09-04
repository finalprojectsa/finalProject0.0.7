import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSpecifiedGuestComponent } from './select-specified-guest.component';

describe('SelectSpecifiedGuestComponent', () => {
  let component: SelectSpecifiedGuestComponent;
  let fixture: ComponentFixture<SelectSpecifiedGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSpecifiedGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSpecifiedGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
