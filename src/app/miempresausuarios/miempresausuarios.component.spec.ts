import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiempresausuariosComponent } from './miempresausuarios.component';

describe('MiempresausuariosComponent', () => {
  let component: MiempresausuariosComponent;
  let fixture: ComponentFixture<MiempresausuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiempresausuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiempresausuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
