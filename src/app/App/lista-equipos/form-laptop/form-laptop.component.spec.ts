import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLaptopComponent } from './form-laptop.component';

describe('FormLaptopComponent', () => {
  let component: FormLaptopComponent;
  let fixture: ComponentFixture<FormLaptopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLaptopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLaptopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
