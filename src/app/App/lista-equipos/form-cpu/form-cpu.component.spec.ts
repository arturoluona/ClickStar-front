import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCpuComponent } from './form-cpu.component';

describe('FormCpuComponent', () => {
  let component: FormCpuComponent;
  let fixture: ComponentFixture<FormCpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCpuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
