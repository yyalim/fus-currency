import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMonthComponent } from './last-month.component';

describe('LastMonthComponent', () => {
  let component: LastMonthComponent;
  let fixture: ComponentFixture<LastMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
