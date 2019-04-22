import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletaccountListComponent } from './walletaccount-list.component';

describe('WalletaccountListComponent', () => {
  let component: WalletaccountListComponent;
  let fixture: ComponentFixture<WalletaccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletaccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletaccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
