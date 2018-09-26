import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Department } from '../department';
import { Message } from '../message';

@Component({
  selector: 'rcc-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {


  allEmployees = 'All Employees';
  departments: Department[] = [
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Garage' },
    { id: 3, name: 'Admin(HR)' },
    { id: 4, name: 'Food & Beverage' },
    { id: 5, name: 'Productions' }
  ];
  message: Message;



  selectedDepartments = [];

  alertMessage = '';

  isDisabled = false;
  isDisabledGroup = false;
  isChecked = false;

  constructor(private usersService: UsersService,
    private alertsService: AlertsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
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
        console.log("check result: " + result);
        // this.router.navigate(['login']);
      } else { }
    }, error => {
      console.log("check this error: " + error);
      // this.errorDialogService.setErrorMsg(error.errMsg);
      // this.errorDialogService.openDialog(this.errorDialogService.getErrorMsg());
    });;
  }
}


