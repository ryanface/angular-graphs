import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZingComponent } from './zing.component';

describe('ZingComponent', () => {
  let component: ZingComponent;
  let fixture: ComponentFixture<ZingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
