import { TestBed } from '@angular/core/testing';

import { NoLoggedInUserGuard } from './no-logged-in-user.guard';

describe('NoLoggedInUserGuard', () => {
  let guard: NoLoggedInUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoLoggedInUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
