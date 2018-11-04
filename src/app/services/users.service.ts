import { Injectable } from '@angular/core';
import { Registrant } from '../registrant';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { Department } from '../department';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userType: number = null;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  /**
   * Registers the user in our system.
   * @param registrant - registration information
   */
  register(registrant: Registrant){
    return this.http.post(this.config.getRccUrl() + '/users/register', registrant, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getUsers() {
    return this.http.get(this.config.getRccUrl() + '/users/getUsers', this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // need to pass array of departments with GET for query
  getPhoneNumbersByDepartments(departments: Department[]) {
    return this.http.post(this.config.getRccUrl() + '/users/getPhoneNumbersByDepts', departments, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  setUser(user: any) {
    this.userType = user.usertype.id;
    console.log('service-setUser userType: ' + user.usertype.id);

  }

  getUser() {
    return this.userType;
  }

  // Service used to get all unacknowledged policies given a policy id
  getUnackedByPolicyID(policyID: number) {
    return this.http.get(this.config.getRccUrl() + '/policies/getUnackEmployees/' + policyID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to get all unacknowledged surveys given a policy id
  getUnackedBySurveyID(surveyID: number) {
    return this.http.get(this.config.getRccUrl() + '/surveys/getUnackEmployees/' + surveyID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        console.log(error);
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(error.error);
  }

}
