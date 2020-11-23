import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOthersComponent } from './form-others.component';

describe('FormOthersComponent', () => {
  let component: FormOthersComponent;
  let fixture: ComponentFixture<FormOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOthersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
