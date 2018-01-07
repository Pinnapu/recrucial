import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequisitionsComponent } from './user-requisitions.component';

describe('UserRequisitionsComponent', () => {
  let component: UserRequisitionsComponent;
  let fixture: ComponentFixture<UserRequisitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRequisitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequisitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
