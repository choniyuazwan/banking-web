import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarRegisterComponent } from './bar-register.component';

describe('BarRegisterComponent', () => {
  let component: BarRegisterComponent;
  let fixture: ComponentFixture<BarRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
