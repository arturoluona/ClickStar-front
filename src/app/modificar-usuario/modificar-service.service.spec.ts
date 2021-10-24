import { TestBed } from '@angular/core/testing';

import { ModificarServiceService } from './modificar-service.service';

describe('ModificarServiceService', () => {
  let service: ModificarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
