import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecempdetailsComponent } from './secempdetails.component';

describe('SecempdetailsComponent', () => {
  let component: SecempdetailsComponent;
  let fixture: ComponentFixture<SecempdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecempdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecempdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
