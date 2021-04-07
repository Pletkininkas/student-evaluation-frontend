import { Injectable } from '@angular/core';
import { LocalStorageData } from '../shared/local-storage-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public setAuthData(authData: LocalStorageData) {
    localStorage.setItem('token', authData.jwt);
    localStorage.setItem('tokenExpirationDate', authData.date.toString());
    localStorage.setItem('userRole', authData.role[0]);
    localStorage.setItem('userId', authData.userId.toString());
  }

  public getSessionToken(): string {
    return localStorage.getItem('token');
  }

  public getSessionExpirationDate(): string {
    return localStorage.getItem('tokenExpirationDate');
  }

  public getSessionUserRole(): string {
    return localStorage.getItem('userRole');
  }

  public getSessionUserId(): string {
    return localStorage.getItem('userId');
  }

  public removeAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }
}
