import { Injectable } from '@angular/core';
import {Registrant} from '../registrant';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  /**
   * Validate Username
   * @param username - user's account username
   */
  validateUsername(username: String): boolean {
    return true;
  }
  
}
