import { TestBed } from '@angular/core/testing';
import { PasswordService } from './password.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PasswordService', () => {
  let service: PasswordService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PasswordService]
    });

    service = TestBed.inject(PasswordService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call generatePassword method', () => {
    const mockParams = {
      length: 20,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSpecialChars: true
    };

    service.generatePassword(mockParams).subscribe();

    const req = httpMock.expectOne(`${service.apiUrl}/generate_password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockParams);
    req.flush('mocked password');

    httpMock.verify();
  });

  it('should call getPasswordHistory method', () => {
    service.getPasswordHistory().subscribe(result => {
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.apiUrl}/password_history`);
    expect(req.request.method).toBe('GET');
    req.flush(['mocked history']);

    httpMock.verify();
  });
});
