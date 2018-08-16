import { Injectable } from '@angular/core';
import { Registrant } from '../registrant';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  /**
   * Registers the user in our system.
   * @param registrant - registration information
   */
  register(registrant: Registrant): Observable<boolean> {
    return of(true);
  }
}
