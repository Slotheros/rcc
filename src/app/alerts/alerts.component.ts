import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Department } from '../department';
import { Message } from '../message';
import { Globals } from '../globals';
import { SelectDepartmentsComponent } from '../select-departments/select-departments.component';
import { SelectedDepartmentsService } from '../services/selected-departments.service';


@Component({
  selector: 'rcc-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  providers: [SelectDepartmentsComponent]
})

export class AlertsComponent implements OnInit {

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;
  
  message: Message;
  selectedDepartments: Department[] = [];
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
    private globals: Globals,
    private selectDepartments: SelectDepartmentsComponent,
    private selectedDepartmentsService: SelectedDepartmentsService
  ) {}

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
      this.userType = result['usertype']['id'];
      this.userDeptName = result['department']['name'];
      this.currentDeptObj = {id: result['department']['id'], name: result['department']['name']};
      if (result['usertype']['id'] === this.STANDARD) {
        this.router.navigate(['login']);
      } else if (result['usertype']['id'] === this.DPTHEAD) {
        this.selectedDepartments.push(this.currentDeptObj);
        this.selectedDepartmentsService.setSelectedDepartments(this.selectedDepartments);
        this.selectedDepartments.forEach(element => {
          console.log("dept head " + element.name)
        });
      }
    }, error => {
      this.router.navigate(['login']);
    });

    this.message = {
      message: undefined,
      departments: undefined,
    };
  }

  sendMsg(msg) {
    this.selectedDepartments = this.selectedDepartmentsService.getSelectedDepartments();
    this.selectedDepartments.forEach(element => {
      console.log('selectedList: ' + element.name);

    });

    if (this.selectedDepartments.length > this.globals.departments.length) {
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


