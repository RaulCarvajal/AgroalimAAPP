import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoexistenteSnackbarComponent } from './contactoexistente-snackbar.component';

describe('ContactoexistenteSnackbarComponent', () => {
  let component: ContactoexistenteSnackbarComponent;
  let fixture: ComponentFixture<ContactoexistenteSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoexistenteSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoexistenteSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
