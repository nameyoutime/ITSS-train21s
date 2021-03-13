import { TestBed } from '@angular/core/testing';

import { InOutService } from './in-out.service';

describe('InOutService', () => {
  let service: InOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
