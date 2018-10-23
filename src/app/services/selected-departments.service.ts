import { Injectable } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Department } from '../department';
import { Globals } from '../globals';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectedDepartmentsService {

  selectedDepartments: Department[];

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  setSelectedDepartments(depts) {
    this.selectedDepartments = [];
    this.selectedDepartments = depts;
  }

  getSelectedDepartments() {
    return this.selectedDepartments;
  }

}
