/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationHttpInterceptorService } from './authentication-http-interceptor.service';

describe('Service: AuthenticationHttpInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationHttpInterceptorService]
    });
  });

  it('should ...', inject([AuthenticationHttpInterceptorService], (service: AuthenticationHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
