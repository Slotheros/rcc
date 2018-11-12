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
import {ManageUserSettings} from '../manageUserSettings';

@Component({
  selector: 'rcc-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  editUserSettings = this.globals.EMPTY_MANAGE_USER_SETTINGS as ManageUserSettings;
  userDepartments = this.globals.departments;
  userTypes = this.globals.userTypes;
  dialogRef: MatDialogRef<UserSettingsDialogComponent>;
  userID: number = null;
  userType: number = null;
  displayedColumns = ['name', 'email', 'department', 'userType', 'active'];
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
      this.updateEmployees();
    }, error => {
      this.router.navigate(['login']);
    }, () => {
      // Do Nothing
    });
  }

  // calls the backend for a list of all employees
  updateEmployees() {
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
            'status': employee['status'] === 1,
            'userID': employee['eID'],
            'userType': employee['usertypeID']
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

  // Updates the database to match the editted user settings
  updateManagedUser() {
    // update the department
    this.usersService.updateManagedUserDepartment(this.editUserSettings).subscribe(result => {
      // do nothing
    }, error => {
      console.log('Failure to update the user\'s department.');
      console.log(error);
    });

    // update the user type
    this.usersService.updateManagedUserType(this.editUserSettings).subscribe(result => {
      // do nothing
    }, error => {
      console.log('Failure to update the user\'s type.');
      console.log(error);
    });

    // update the user's active status
    this.updateUserStatus(this.editUserSettings.active, this.editUserSettings.userID);

    // update the employee list
    this.updateEmployees();
  }

  updateDepartment(dept, userID) {
    // set the form's option's id to be the new department
    this.editUserSettings.department = dept;
    this.editUserSettings.userID = userID;

    // update the department
    this.usersService.updateManagedUserDepartment(this.editUserSettings).subscribe(result => {
      // update the employee list
      this.updateEmployees();
    }, error => {
      console.log('Failure to update the user\'s department.');
      console.log(error);
    });
  }

  updateUserType(type, userID) {
    // set the form's option's id to be the new usertype
    this.editUserSettings.userType = type;
    this.editUserSettings.userID = userID;

    // update the user type
    this.usersService.updateManagedUserType(this.editUserSettings).subscribe(result => {
      // update the employee list
      this.updateEmployees();
    }, error => {
      console.log('Failure to update the user\'s type.');
      console.log(error);
    });
  }

  // Updates the database to match the editted user status
  updateUserStatus(active: boolean, userID: number) {
    console.log('Setting user status to ' + active + '...');

    const data  = {
      active: active,
      userID: userID
    } as ManageUserSettings;

    this.usersService.updateManagedUserStatus(data).subscribe(result => {
      // update the employee list
      this.updateEmployees();
    }, error => {
      console.log('Failure to update the user\'s status.');
      console.log(error);
    });
  }

  // partially implemented functionality, but feature is not in the project charter
  /*
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

        this.usersService.register(data).subscribe(result => {
          // update employees list to show the changes
          this.populateEmployees(); }, error => {
          console.log('Failure adding new user to the DB.');
        });

      } else {
        console.log('User is null');
      }
    });
  }

  // opens a dialog box that allows a user's settings to be changed by an admin
  openEditUserDialog(user) {
    console.log('Opening settings for user ' + user.fName + ' ' + user.lName + '...');

     // Reset the new policy to an empty Policy object
    this.editUserSettings = this.globals.EMPTY_MANAGE_USER_SETTINGS;

    // Open dialog and keep a reference to it
    this.dialogRef = this.dialog.open(UserSettingsDialogComponent, {
      data: {
        departments: user ? user.department : '',
        usertype: user ? user.userType : '',
        active: user ? user.status : false
      }
    });

    // After the dialog is close, handle the data from the forms
    this.dialogRef.afterClosed().subscribe(data => {
      if (user) {
        if (data) {
          this.editUserSettings.userID = data['userID'];
          this.editUserSettings.department = data['department'];
          this.editUserSettings = data['userType'];
          this.updateManagedUser();
        } else {
          console.log('Edit cancelled');
        }
      } else {
        console.log('User is null');
      }
    });
  }
  */

}
