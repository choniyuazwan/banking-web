import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletEditComponent } from './wallet-edit.component';

describe('WalletEditComponent', () => {
  let component: WalletEditComponent;
  let fixture: ComponentFixture<WalletEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
