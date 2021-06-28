import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderencuestaComponent } from './responderencuesta.component';

describe('ResponderencuestaComponent', () => {
  let component: ResponderencuestaComponent;
  let fixture: ComponentFixture<ResponderencuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderencuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
