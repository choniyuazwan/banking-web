import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTransferComponent } from './transaction-transfer.component';

describe('TransactionTransferComponent', () => {
  let component: TransactionTransferComponent;
  let fixture: ComponentFixture<TransactionTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
