import { TestBed } from '@angular/core/testing';

import { FormRouterService } from './form-router.service';

describe('FormRouterService', () => {
  let service: FormRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
