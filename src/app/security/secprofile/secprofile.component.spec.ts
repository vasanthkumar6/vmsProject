import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecprofileComponent } from './secprofile.component';

describe('SecprofileComponent', () => {
  let component: SecprofileComponent;
  let fixture: ComponentFixture<SecprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
