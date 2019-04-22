import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletaccountAddComponent } from './walletaccount-add.component';

describe('WalletaccountAddComponent', () => {
  let component: WalletaccountAddComponent;
  let fixture: ComponentFixture<WalletaccountAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletaccountAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletaccountAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
