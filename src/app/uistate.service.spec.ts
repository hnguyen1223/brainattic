import { TestBed } from '@angular/core/testing';

import { UistateService } from './uistate.service';

describe('UistateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UistateService = TestBed.get(UistateService);
    expect(service).toBeTruthy();
  });
});
