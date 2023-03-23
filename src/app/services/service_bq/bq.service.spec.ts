/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BqService } from './bq.service';

describe('Service: Transferencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BqService]
    });
  });

  it('should ...', inject([BqService], (service: BqService) => {
    expect(service).toBeTruthy();
  }));
});
