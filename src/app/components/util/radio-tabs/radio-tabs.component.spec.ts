import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioTabsComponent } from './radio-tabs.component';

describe('RadioTabsComponent', () => {
  let component: RadioTabsComponent;
  let fixture: ComponentFixture<RadioTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
