import { TestBed } from '@angular/core/testing';

import { FormOthersService } from './form-others.service';

describe('FormOthersService', () => {
  let service: FormOthersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormOthersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
