/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CadastroService } from './cadastro.service';

describe('Service: Transferencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadastroService]
    });
  });

  it('should ...', inject([CadastroService], (service: CadastroService) => {
    expect(service).toBeTruthy();
  }));
});
