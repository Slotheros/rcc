import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'rcc-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {


  allEmployees = "All Employees";
  departments = ['Administrative', 'Operations', 'Production', 'Food/Beverage', 'Sales', 'Garage'];

  selectedDepartments = [];

  alertMessage = "";

  isDisabled: boolean = false;
  isDisabledGroup: boolean = false;

  constructor(
    private usersService: UsersService,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
  }

  onClickDepartment(dept) {
    if(dept == this.allEmployees) {
      if(this.isDisabledGroup == false && this.isDisabled == false) {
        this.isDisabledGroup = true;
        this.selectedDepartments = this.departments;
      } else if (this.isDisabledGroup == true && this.isDisabled == false) {
        this.isDisabledGroup = false;
        this.selectedDepartments = [];
      } else {
        return;
      }
    } else {
      var index = this.selectedDepartments.indexOf(dept);
      //department is going from checked to unchecked, no other box is checked
      if (index > -1 && this.selectedDepartments.length == 1 && this.isDisabledGroup == false) {
        this.isDisabled = false;
        this.selectedDepartments.splice(index, 1);

      //department is going from checked to unchecked, there are still other departments checked
      } else if (index > -1 && this.selectedDepartments.length > 1 && this.isDisabledGroup == false) {
        this.selectedDepartments.splice(index, 1);

      //department is going from unchecked to checked
      } else if (index == -1 && this.isDisabledGroup == false) {
        this.isDisabled = true;
        this.selectedDepartments.push(dept);
      } else {
        return;
      }
    }
  }

  sendMsg(msg) {
    if(this.selectedDepartments.length > this.departments.length) {
      console.log("ERROR: department list is incorrect")
      return;
    }
    console.log(this.selectedDepartments);
    console.log(msg);
    // this.usersService.getUsersByDepartment(this.selectedDepartments);
    this.alertsService.sendAlert(msg).subscribe(result => console.log("working"), error => console.log("not working"));

  }

}


