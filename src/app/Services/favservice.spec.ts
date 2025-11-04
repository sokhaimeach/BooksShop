import { TestBed } from '@angular/core/testing';

import { Favservice } from './favservice';

describe('Favservice', () => {
  let service: Favservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Favservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
