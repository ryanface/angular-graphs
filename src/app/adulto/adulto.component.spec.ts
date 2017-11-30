import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultoComponent } from './adulto.component';

describe('AdultoComponent', () => {
  let component: AdultoComponent;
  let fixture: ComponentFixture<AdultoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdultoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
