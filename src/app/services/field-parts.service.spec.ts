import { TestBed } from '@angular/core/testing';

import { FieldPartsService } from './field-parts.service';

describe('FieldPartsService', () => {
  let service: FieldPartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldPartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
