import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthenticationServiceService } from './authentication-service.service';

describe('AuthenticationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AuthenticationServiceService,
    ]

  }));

  it('should be created', () => {
    const service: AuthenticationServiceService = TestBed.get(AuthenticationServiceService);
    expect(service).toBeTruthy();
  });

  describe('login()', ()=> {
    beforeEach(()=> {
      let store = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  spyOn(localStorage, 'getItem')
  .and.callFake(mockLocalStorage.getItem);

  spyOn(localStorage, 'setItem')
  .and.callFake(mockLocalStorage.setItem);
    });
  

  it('should login for valid username and password',
  inject([HttpTestingController, AuthenticationServiceService], (httpMock: HttpTestingController, authenticationServiceService: AuthenticationServiceService) => {

    const mockResponse = 
      { username: 'abc@a.com', password: 'pass@123' };

      authenticationServiceService.login('abc@a.com', 'pass@123').subscribe((user) => {

        expect(user.username).toEqual(`abc@a.com`);
        expect(user.password).toEqual(`pass@123`);
        expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(user));

      });

      const req = httpMock.expectOne(`http://localhost:8089/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockResponse);
      
    }));

      afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
      }));


      it('should not login for invalid username and password',
  inject([HttpTestingController, AuthenticationServiceService], (httpMock: HttpTestingController, authenticationServiceService: AuthenticationServiceService) => {

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = 'Invalid request parameters';

      authenticationServiceService.login('abc@a.com', 'pass@123').subscribe((user) => {

        expect(user.username).toEqual(``);
        expect(user.password).toEqual(``);
        expect(localStorage.getItem('currentUser')).toEqual(``);

      });

      const req = httpMock.expectOne(`http://localhost:8089/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(data, mockErrorResponse);
      
    }));

  });

});
