import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Globals } from '../globals';
import { MatDialog, MatDialogConfig, MatDialogRef, MatExpansionPanel, MatSlideToggle } from '@angular/material';
import { Employee } from '../employee';
import {PolicyDialogComponent} from '../policy-dialog/policy-dialog.component';
import {Policy} from '../policy';
import {CsvCompareService} from '../services/csv-compare.service';
import {Registrant} from '../registrant';

@Component({
  selector: 'rcc-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  userID: number = null;
  userType: number = null;
  displayedColumns = ['name', 'phone', 'email', 'active'];
  employees: Array<Registrant> = [];

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  constructor(private authService: AuthService,
              private router: Router,
              private usersService: UsersService) { }

  ngOnInit() {
    // authenticate the user
    this.authService.loggedIn().subscribe(result => {
      // Set userID to what was given from authService
      this.userID = result['eId'];
      this.userType = result['usertype']['id'];
      this.populateEmployees();
    }, error => {
      this.router.navigate(['login']);
    }, () => {
      // Do Nothing
    });
  }

  // calls the backend for a list of all employees
  populateEmployees() {
    // If the user is an admin, get all of the policies
    if (this.userType === this.SUPERUSER || this.userType === this.ADMIN) {
      this.usersService.getUsers().subscribe(result => {

        console.log('all employees:');
        console.log(result);

        for (const employee of result as Array<Object>) {
          const e = {
            'fName': employee['fname'],
            'lName': employee['lname'],
            'email': employee['email'],
            'phoneNum': employee['phone'],
            'department': employee['departmentID'],
            'password': employee['password']
          } as Registrant;
          this.employees.push(e);
        }
      }, error => {
        console.log('Error retrieving employees');
        console.log(error);
      });
    }
  }

  // opens a dialog box that allows a new user to be created by an admin
  openCreateUserDialog() {
    // TODO
  }

}
