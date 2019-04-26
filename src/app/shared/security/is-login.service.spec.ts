import { TestBed } from '@angular/core/testing';

import { IsLoginService } from './is-login.service';

describe('IsLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsLoginService = TestBed.get(IsLoginService);
    expect(service).toBeTruthy();
  });
});
