import { Injectable } from '@angular/core';
import {Registrant} from '../registrant';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  /**
   * Validate Email
   * Returns true if the email address is valid.
   * Regex value is from here: http://emailregex.com/
   * @param email - user's email address
   */
  validateEmail(email: string): boolean {
    const regex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
      '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    const result = regex.test(email);
    console.log('Email Valid: ' + result);
    return result;
  }

  /**
   * Validate Password
   * Returns true if the password meets the criteria mentioned on the registration page
   * @param password - user's password
   */
  validatePassword(password: string): boolean {
    const regex = new RegExp('((?=.*\\d)(?=.*[A-Z])(?=.*\\W).{8,})');
    const result = regex.test(password.trim());
    console.log('Password Valid: ' + result);
    return result;
  }

  /**
   * Validate Name
   * Returns true if the name contains only letters, spaces, and characters ' and -
   * @param name - user's name
   */
  validateName(name: string): boolean {
    const regex = new RegExp('^[A-Za-z][A-Za-z\\\'\\-]+([\\ A-Za-z][A-Za-z\\\'\\-]+)*');
    const result = regex.test(name.trim());
    console.log('Name: ' + name.trim() + ' | Valid: ' + result);
    return result;
  }

  /**
   * Validate Phone Number
   * Returns true if the phone number is 10 digits, regardless of how it is formatted
   * Regex value is from here: https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
   * @param phoneNumber - user's phone number
   */
  validatePhoneNumber(phoneNumber: string): boolean {
    const regex = new RegExp('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$');
    const result = regex.test(phoneNumber.trim());
    console.log('Phone Number Valid: ' + result);
    return result;
  }

  /**
   * Validate Dropdown
   * @param selectedValue - user's dropdown choice
   */
  validateDropdown(selectedValue: string): boolean {
    const result = !(selectedValue === '');
    console.log('Dropdown Valid: ' + result);
    return result;
  }

  /**
   * Validate Registrant
   * Returns true if all of the registrant's fields are valid
   * @param registrant - user's info entered on the registration page
   */
  validateRegistrant(registrant: Registrant): boolean {
    return (
      this.validateName(registrant.fName)
      && this.validateName(registrant.lName)
      && this.validateEmail(registrant.email)
      && this.validatePhoneNumber(registrant.phoneNum)
      // && this.validateDropdown(registrant.department)
      && this.validatePassword(registrant.password));
  }
}
