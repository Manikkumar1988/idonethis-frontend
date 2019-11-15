import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthenticationServiceService } from './authentication-service.service';

describe('AuthenticationServiceService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationServiceService]
    })
  );

  it('should be created', () => {
    const service: AuthenticationServiceService = TestBed.get(
      AuthenticationServiceService
    );
    expect(service).toBeTruthy();
  });
});

describe('AuthenticationServiceService -> login()', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationServiceService]
    });

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

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);

    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);

    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
  });

  it('should login for valid username and password', inject(
    [HttpTestingController, AuthenticationServiceService],
    (
      httpMock: HttpTestingController,
      authenticationServiceService: AuthenticationServiceService
    ) => {
      const mockResponse = { username: 'abc@a.com', password: 'pass@123' };

      authenticationServiceService
        .login('abc@a.com', 'pass@123')
        .subscribe(user => {
          expect(user.username).toEqual(`abc@a.com`);
          expect(user.password).toEqual(`pass@123`);
          expect(localStorage.getItem('currentUser')).toEqual(
            JSON.stringify(user)
          );
        });

      const req = httpMock.expectOne(`http://localhost:8089/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockResponse);
    }
  ));

  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));

  it('should not login for invalid username and password', inject(
    [HttpTestingController, AuthenticationServiceService],
    (
      httpMock: HttpTestingController,
      authenticationServiceService: AuthenticationServiceService
    ) => {
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = 'Invalid request parameters';

      authenticationServiceService
        .login('abc@a.com', 'pass@123')
        .subscribe(user => {
          expect(user.username).toBeUndefined();
          expect(user.password).toBeUndefined();
        });

      const req = httpMock.expectOne(`http://localhost:8089/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(data, mockErrorResponse);
    }
  ));

  it('should not login for API error', inject(
    [HttpTestingController, AuthenticationServiceService],
    (
      httpMock: HttpTestingController,
      authenticationServiceService: AuthenticationServiceService
    ) => {
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = 'Invalid request parameters';

      authenticationServiceService
        .login('abc@a.com', 'pass@123')
        .subscribe(user => {
          expect(user.username).toBeUndefined();
          expect(user.password).toBeUndefined();
        });

      const req = httpMock.expectOne(`http://localhost:8089/login`);
      expect(req.request.method).toEqual('POST');
      req.error(new ErrorEvent('network error'), mockErrorResponse);
    }
  ));

  it('should clear local storage on logout', inject(
    [AuthenticationServiceService],
    (authenticationServiceService: AuthenticationServiceService) => {
      authenticationServiceService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
      expect(localStorage.removeItem).toHaveBeenCalled();
    }
  ));
});

describe('AuthenticationServiceService -> register()', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationServiceService]
    });
  });

  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));
  
  it('should register for valid firstname , username and password',inject(
    [HttpTestingController, AuthenticationServiceService],
    (
      httpMock: HttpTestingController,
      authenticationServiceService: AuthenticationServiceService
    ) =>{
      const mockResponse ={ status: 'success'};

      authenticationServiceService
      .register('firstName','username','password')
      .subscribe(user => {
        expect(user.status).toEqual(`success`);

      });
      const req = httpMock.expectOne(`http://localhost:8089/register`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockResponse);
    }
  ));
  it('should not register for invalid firstname,username,password',inject(
    [HttpTestingController, AuthenticationServiceService],
    (
      httpMock: HttpTestingController,
      authenticationServiceService: AuthenticationServiceService
    ) => {
      const mockErrorResponse = { requestStatus: 400, statusText: 'Bad Request' };
      const data = 'Invalid request parameters';

      authenticationServiceService
      .register('firstName','username','password')
      .subscribe(user => {
        expect(user.requestStatus).toEqual(400);
        expect(user.statusText).toEqual('Bad Request');
      });
      const req = httpMock.expectOne(`http://localhost:8089/register`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockErrorResponse);
    }
  ));

  it('should not register for API error',inject(
    [HttpTestingController, AuthenticationServiceService],
    (
      httpMock: HttpTestingController,
      authenticationServiceService: AuthenticationServiceService
    ) => {
      const mockErrorResponse = { requestStatus: 400, statusText: 'Bad Request' };
      const data = 'Invalid request parameters';

      authenticationServiceService
      .register('firstName','username','password')
      .subscribe(user => {
        expect(user.firstname).toBeUndefined();
        expect(user.username).toBeUndefined();
        expect(user.password).toBeUndefined();
      });
      const req = httpMock.expectOne(`http://localhost:8089/register`);
      expect(req.request.method).toEqual('POST');
      req.error(new ErrorEvent('network error'), mockErrorResponse);
    }
  ));
});