import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfcexistenteSnackbarComponent } from './rfcexistente-snackbar.component';

describe('RfcexistenteSnackbarComponent', () => {
  let component: RfcexistenteSnackbarComponent;
  let fixture: ComponentFixture<RfcexistenteSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfcexistenteSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfcexistenteSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
