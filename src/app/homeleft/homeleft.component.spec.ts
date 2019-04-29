import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeleftComponent } from './homeleft.component';

describe('HomeleftComponent', () => {
  let component: HomeleftComponent;
  let fixture: ComponentFixture<HomeleftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeleftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeleftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
