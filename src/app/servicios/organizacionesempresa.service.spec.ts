import { TestBed } from '@angular/core/testing';

import { OrganizacionesempresaService } from './organizacionesempresa.service';

describe('OrganizacionesempresaService', () => {
  let service: OrganizacionesempresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizacionesempresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
