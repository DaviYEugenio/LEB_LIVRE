/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConteudosService } from './conteudos.service';

describe('Service: Transferencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConteudosService]
    });
  });

  it('should ...', inject([ConteudosService], (service: ConteudosService) => {
    expect(service).toBeTruthy();
  }));
});
