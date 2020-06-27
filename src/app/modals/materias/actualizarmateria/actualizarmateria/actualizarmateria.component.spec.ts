import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarmateriaComponent } from './actualizarmateria.component';

describe('ActualizarmateriaComponent', () => {
  let component: ActualizarmateriaComponent;
  let fixture: ComponentFixture<ActualizarmateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarmateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarmateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
