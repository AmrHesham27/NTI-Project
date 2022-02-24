import { TestBed } from '@angular/core/testing';

import { AllUsers } from './allUsers.guard';

describe('AllUsers', () => {
  let guard: AllUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllUsers);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
