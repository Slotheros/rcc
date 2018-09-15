import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }), 
  withCredentials: true
};

let body = new URLSearchParams();

@Injectable({
  providedIn: 'root'
})

export class AlertsService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  sendAlert(msg: string) {
    body.set('message', msg);
    return this.http.post(this.config.getRccUrl() + '/alerts/sms', body.toString(), httpOptions).pipe(
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
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(error.error);
  };
}

