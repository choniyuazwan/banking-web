import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLoginComponent } from './bar-login.component';

describe('BarLoginComponent', () => {
  let component: BarLoginComponent;
  let fixture: ComponentFixture<BarLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
