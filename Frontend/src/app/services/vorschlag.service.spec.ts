import { TestBed } from '@angular/core/testing';

import { VorschlagService } from './vorschlag.service';

describe('VorschlagService', () => {
  let service: VorschlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VorschlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
