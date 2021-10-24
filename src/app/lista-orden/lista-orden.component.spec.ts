import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOrdenComponent } from './lista-orden.component';

describe('ListaOrdenComponent', () => {
  let component: ListaOrdenComponent;
  let fixture: ComponentFixture<ListaOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaOrdenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
