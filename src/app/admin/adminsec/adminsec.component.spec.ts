import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsecComponent } from './adminsec.component';

describe('AdminsecComponent', () => {
  let component: AdminsecComponent;
  let fixture: ComponentFixture<AdminsecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
