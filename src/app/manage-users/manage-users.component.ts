import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Globals } from '../globals';
import { MatDialog, MatDialogConfig, MatDialogRef, MatExpansionPanel, MatSlideToggle } from '@angular/material';
import {PolicyDialogComponent} from '../policy-dialog/policy-dialog.component';
import {Policy} from '../policy';
import {Registrant} from '../registrant';
import {Validators} from '@angular/forms';
import {UserSettingsDialogComponent} from '../user-settings-dialog/user-settings-dialog.component';

@Component({
  selector: 'rcc-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  newUserSettings = this.globals.EMPTY_USER;
  dialogRef: MatDialogRef<UserSettingsDialogComponent>;
  userID: number = null;
  userType: number = null;
  displayedColumns = ['name', 'phone', 'email', 'active', 'settings'];
  employees: Array<Registrant> = [];

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  constructor(private authService: AuthService,
              private router: Router,
              private usersService: UsersService,
              private dialog: MatDialog,
              private globals: Globals) { }

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
    // empty the employees table
    this.employees = Array<Registrant>();

    // If the user is an admin, get all of the employees
    if (this.userType === this.SUPERUSER || this.userType === this.ADMIN) {
      this.usersService.getUsers().subscribe(result => {

        for (const employee of result as Array<Object>) {
          const e = {
            'fName': employee['fname'],
            'lName': employee['lname'],
            'email': employee['email'],
            'phoneNum': employee['phone'],
            'department': employee['departmentID'],
            'password': employee['password'],
            'status': employee['status'] === 1
          } as Registrant;
          this.employees.push(e);
        }

        console.log('all employees:');
        console.log(this.employees);
      }, error => {
        console.log('Error retrieving employees');
        console.log(error);
      });
    }
  }

  // opens a dialog box that allows a new user to be created by an admin
  openCreateUserDialog() {
    // Open dialog and keep a reference to it
    this.dialogRef = this.dialog.open(UserSettingsDialogComponent, {
      data: {
        fName: this.newUserSettings.fName,
        lName: this.newUserSettings.lName,
        email: this.newUserSettings.email,
        phoneNum: this.newUserSettings.phoneNum,
        department: this.newUserSettings.department,
      }
    });

    // After the dialog is close, handle the data from the forms
    this.dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log('Creating user with this data:');
        console.log(data);
        /*
        this.usersService.register(data).subscribe(result => {
          // update employees list to show the changes
          this.populateEmployees(); }, error => {
          console.log('Failure adding new user to the DB.');
        });
        */
      } else {
        console.log('User is null');
      }
    });
  }

  // opens a dialog box that allows a user's settings to be changed by an admin
  openEditUserDialog(user: Registrant) {
    console.log('Opening settings for user ' + user.fName + ' ' + user.lName + '...');
/*
    // Reset the new policy to an empty Policy object
    this.editPolicy = this.globals.EMPTY_POLICY as Policy;

    // Open dialog and keep a reference to it
    this.dialogRef = this.dialog.open(PolicyDialogComponent, {
      data: {
        title: policy ? policy.title : '',
        description: policy ? policy.description : '',
        url: policy ? policy.url : '',
        departments: policy ? policy.departments : ''
      }
    });

    // After the dialog is close, handle the data from the forms
    this.dialogRef.afterClosed().subscribe(data => {
      if (policy) {
        if (data) {
          data['policyId'] = policy.id;
          this.acknowledgePolicyService.updatePolicy(data).subscribe(result => {
            // update policies array to show the changes
            this.updatePolicyArrays(); }, error => {
            console.log('Failure to change policy to the DB.');
            console.log(error);
          });
        } else {
          console.log('Edit cancelled');
        }
      } else {
        console.log('Policy is null');
      }
    });*/
  }

  // opens a dialog box that allows a new user to be created by an admin
  toggleUserStatus(status: boolean) {
    // TODO
    console.log('Setting user status to ' + !status + '...');
    // this.usersService.setStatus(!status);
  }

}
