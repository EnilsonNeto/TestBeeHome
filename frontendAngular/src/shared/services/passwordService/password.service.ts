import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneratedPasswordResponse, GeneratePasswordRequest } from '../../models/password.model';
import { PasswordHistoryResponse } from '../../models/password-history.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  generatePassword(request: GeneratePasswordRequest): Observable<GeneratedPasswordResponse> {
    return this.http.post<GeneratedPasswordResponse>(`${this.apiUrl}/generate_password`, request, {
        headers: { 'Content-Type': 'application/json' }
    });
}

  getPasswordHistory(): Observable<PasswordHistoryResponse> {
    return this.http.get<PasswordHistoryResponse>(`${this.apiUrl}/password_history`);
  }
}
