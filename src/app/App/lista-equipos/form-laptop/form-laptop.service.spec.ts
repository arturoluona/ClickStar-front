import { TestBed } from '@angular/core/testing';

import { FormLaptopService } from './form-laptop.service';

describe('FormLaptopService', () => {
  let service: FormLaptopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormLaptopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
