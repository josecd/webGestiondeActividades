import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadaComponent } from './llamada.component';

describe('LlamadaComponent', () => {
  let component: LlamadaComponent;
  let fixture: ComponentFixture<LlamadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
