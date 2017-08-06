import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifilisComponent } from './difilis.component';

describe('DifilisComponent', () => {
  let component: DifilisComponent;
  let fixture: ComponentFixture<DifilisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifilisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifilisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
