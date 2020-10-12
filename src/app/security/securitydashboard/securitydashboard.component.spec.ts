import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritydashboardComponent } from './securitydashboard.component';

describe('SecuritydashboardComponent', () => {
  let component: SecuritydashboardComponent;
  let fixture: ComponentFixture<SecuritydashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritydashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
