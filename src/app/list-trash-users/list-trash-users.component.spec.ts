import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrashUsersComponent } from './list-trash-users.component';

describe('ListTrashUsersComponent', () => {
  let component: ListTrashUsersComponent;
  let fixture: ComponentFixture<ListTrashUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTrashUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrashUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
