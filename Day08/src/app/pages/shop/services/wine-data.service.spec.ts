import { TestBed } from '@angular/core/testing';

import { WineDataService } from './wine-data.service';

describe('WineDataService', () => {
  let service: WineDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WineDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
