import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTopupComponent } from './transaction-topup.component';

describe('TransactionTopupComponent', () => {
  let component: TransactionTopupComponent;
  let fixture: ComponentFixture<TransactionTopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
