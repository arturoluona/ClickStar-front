import { TestBed } from '@angular/core/testing';

import { FormMonitorService } from './form-monitor.service';

describe('FormMonitorService', () => {
  let service: FormMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
