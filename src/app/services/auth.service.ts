import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Passes the login credentials to the backend for authentication.
   * Currently not the full implementation. Will update once either the
   * backend/in-memory-api is set up.
   * @param username
   * @param password
   */
  login(username: string, password: string): Observable<boolean> {
    console.log(username);
    console.log(password);
    if (username === 'test' && password === 'password') {
      return of(true);
    }
    return of(false);
  }
}
