import { TestBed } from '@angular/core/testing';

import { WalletAccountService } from './wallet-account.service';

describe('WalletAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletAccountService = TestBed.get(WalletAccountService);
    expect(service).toBeTruthy();
  });
});
