import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeclogbookComponent } from './seclogbook.component';

describe('SeclogbookComponent', () => {
  let component: SeclogbookComponent;
  let fixture: ComponentFixture<SeclogbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeclogbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeclogbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
