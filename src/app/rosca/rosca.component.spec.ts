import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoscaComponent } from './rosca.component';

describe('RoscaComponent', () => {
  let component: RoscaComponent;
  let fixture: ComponentFixture<RoscaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoscaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
