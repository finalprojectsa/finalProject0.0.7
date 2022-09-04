import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOccasionComponent } from './order-occasion.component';

describe('OrderOccasionComponent', () => {
  let component: OrderOccasionComponent;
  let fixture: ComponentFixture<OrderOccasionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOccasionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOccasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
