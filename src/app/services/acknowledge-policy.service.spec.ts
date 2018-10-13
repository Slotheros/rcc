import { TestBed, inject } from '@angular/core/testing';

import { AcknowledgePolicyService } from './acknowledge-policy.service';

describe('AcknowledgePolicyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcknowledgePolicyService]
    });
  });

  it('should be created', inject([AcknowledgePolicyService], (service: AcknowledgePolicyService) => {
    expect(service).toBeTruthy();
  }));
});
