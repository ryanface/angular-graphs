import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloComponent } from './Modelo.component';

describe('ModeloComponent', () => {
  let component: ModeloComponent;
  let fixture: ComponentFixture<ModeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
