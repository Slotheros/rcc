import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Passes the login credentials to the backend for authentication.
   * !!!Currently not the full implementation.!!!
   * @param username
   * @param password
   */
  login(username: string, password: string): Observable<boolean> {
    return of(this.tempAuth(username, password));
  }

  // placeholder function until the backend/in-memory-web-api is setup
  private tempAuth(username: string, password: string): boolean {
    if (username === 'test' && password === 'password') {
      return true;
    }
    return false;
  }
}
