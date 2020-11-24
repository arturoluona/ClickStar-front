import { TestBed } from '@angular/core/testing';

import { FormPrinterService } from './form-printer.service';

describe('FormPrinterService', () => {
  let service: FormPrinterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormPrinterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
