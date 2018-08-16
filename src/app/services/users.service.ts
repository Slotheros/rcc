import { Injectable } from '@angular/core';
import { Registrant } from '../registrant';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  register(registrant: Registrant): Observable<boolean> {
    return of(true);
  }
}
