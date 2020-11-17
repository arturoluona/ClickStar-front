import { TestBed } from '@angular/core/testing';

import { ListaOrdenService } from './lista-orden.service';

describe('ListaOrdenService', () => {
  let service: ListaOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
