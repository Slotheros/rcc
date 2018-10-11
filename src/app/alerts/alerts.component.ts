import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Department } from '../department';
import { Message } from '../message';
import { Globals } from '../globals';

@Component({
  selector: 'rcc-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;
  
  allEmployees = 'All Employees';
  departments: Department[];
  message: Message;
  selectedDepartments = [];
  alertMessage = '';

  isDisabled = false;
  isDisabledGroup = false;
  isChecked = false;
  userType = null;
  userDeptName = null;
  currentDeptObj = null;

  constructor(private usersService: UsersService,
    private alertsService: AlertsService,
    private authService: AuthService,
    private router: Router,
    private globals: Globals
  ) {
    this.departments = globals.departments;
  }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
      this.userType = result['usertype']['id'];
      this.userDeptName = result['department']['name'];
      this.currentDeptObj = {id: result['department']['id'], name: result['department']['name']};
      if (result['usertype']['id'] === 3) {
        this.router.navigate(['login']);
      } else if (result['usertype']['id'] === 4) {
        this.selectedDepartments.push(this.currentDeptObj);
      }
    }, error => {
      this.router.navigate(['login']);
    });

    this.message = {
      message: undefined,
      departments: undefined,
    };
  }

  onClickDepartment(dept) {
    if (dept === this.allEmployees) {
      if (this.isDisabledGroup === false && this.isDisabled === false) {
        this.isDisabledGroup = true;
        this.isChecked = true;
        this.selectedDepartments = this.departments;
      } else if (this.isDisabledGroup === true && this.isDisabled === false) {
        this.isDisabledGroup = false;
        this.isChecked = false;
        this.selectedDepartments = [];
      } else {
        return;
      }
    } else {
      const index = this.selectedDepartments.indexOf(dept);
      // department is going from checked to unchecked, no other box is checked
      if (index > -1 && this.selectedDepartments.length === 1 && this.isDisabledGroup === false) {
        this.isDisabled = false;
        this.selectedDepartments.splice(index, 1);

        // department is going from checked to unchecked, there are still other departments checked
      } else if (index > -1 && this.selectedDepartments.length > 1 && this.isDisabledGroup === false) {
        this.selectedDepartments.splice(index, 1);

        // department is going from unchecked to checked
      } else if (index === -1 && this.isDisabledGroup === false) {
        this.isDisabled = true;
        this.selectedDepartments.push(dept);
      } else {
        return;
      }
    }
  }

  sendMsg(msg) {
    console.log('selectedList: ' + this.selectedDepartments);
    if (this.selectedDepartments.length > this.departments.length) {
      console.log('ERROR: department list is incorrect');
      return;
    }
    // console.log(this.selectedDepartments);
    this.message.message = this.alertMessage;
    this.message.departments = this.selectedDepartments;
    // this.usersService.getPhoneNumbersByDepartments(this.selectedDepartments).subscribe(result => {
    this.alertsService.sendAlert(this.message).subscribe(result => {
      if (result) {
        console.log('check result: ' + result);
        // this.router.navigate(['login']);
      } else { }
    }, error => {
      console.log('check this error: ' + error);
      // this.errorDialogService.setErrorMsg(error.errMsg);
      // this.errorDialogService.openDialog(this.errorDialogService.getErrorMsg());
    });
  }
}


