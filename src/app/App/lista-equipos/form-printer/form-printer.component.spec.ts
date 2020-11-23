import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrinterComponent } from './form-printer.component';

describe('FormPrinterComponent', () => {
  let component: FormPrinterComponent;
  let fixture: ComponentFixture<FormPrinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPrinterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
