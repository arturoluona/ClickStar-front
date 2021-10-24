import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOrdenComponent } from './registro-orden.component';

describe('RegistroOrdenComponent', () => {
  let component: RegistroOrdenComponent;
  let fixture: ComponentFixture<RegistroOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroOrdenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
