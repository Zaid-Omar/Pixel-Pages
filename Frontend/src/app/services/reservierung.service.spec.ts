import { TestBed } from '@angular/core/testing';

import { ReservierungService } from './reservierung.service';

describe('ReservierungService', () => {
  let service: ReservierungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservierungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
