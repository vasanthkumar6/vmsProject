import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplogbookComponent } from './emplogbook.component';

describe('EmplogbookComponent', () => {
  let component: EmplogbookComponent;
  let fixture: ComponentFixture<EmplogbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplogbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplogbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
