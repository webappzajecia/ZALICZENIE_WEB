import { TestBed } from '@angular/core/testing';

import { BeerStylesService } from './beer-styles.service';

describe('BeerStylesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeerStylesService = TestBed.get(BeerStylesService);
    expect(service).toBeTruthy();
  });
});
