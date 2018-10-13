import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Policy } from '../policy';
import {hostReportError} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})

export class AcknowledgePolicyService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  // Service used to get all acknowledged policies given a user ID
  getAcknowledged(userID: number) {
    return this.http.get(this.config.getRccUrl() + '/policies/getAcknowledged/' + userID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
    // console.log(response);
  }

  // Service used to get all unacknowledged policies given a user ID
  getUnacknowledged(userID: number) {
    return this.http.get(this.config.getRccUrl() + '/policies/getUnacknowledged/' + userID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to acknowledge a policy given a user ID and policy ID
  acknowledgePolicy(policyID: number, userID: number) {
    const data = { policyId: policyID, eId: userID };
    console.log('hitting ack endpoint with pID: ' + data['policyId'] + ' and eID: ' + data['eId']);
    return this.http.post(this.config.getRccUrl() + '/policies/acknowledge', data, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  /*
  isAcknowledged(userID: number, policyID) {
    const policies = this.http.post(this.config.getRccUrl() + '/policy/getAcknowledged/' + userID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );

    const isAck = policies.filter(policies => student.subject == 'math' && student.score >= 70);
  }*/

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
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(error.error);
  }
}

