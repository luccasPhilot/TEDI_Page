import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  async isAuthenticated(): Promise<boolean> {
    try {
      const res = await this.http
        .get<{ isValid: boolean }>(`${this.apiUrl}/auth/validate-token`, { withCredentials: true })
        .toPromise();
      return res?.isValid ?? false;
    } catch (err) {
      return false;
    }
  }

  login(userData: any): void {
    localStorage.setItem('token', JSON.stringify(userData));
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}