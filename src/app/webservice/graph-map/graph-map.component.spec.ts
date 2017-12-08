import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphMapComponent } from './graph-map.component';

describe('FilterListComponent', () => {
  let component: GraphMapComponent;
  let fixture: ComponentFixture<GraphMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
