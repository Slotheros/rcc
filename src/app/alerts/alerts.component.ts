import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rcc-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {


  departments = ['All Employees', 'Administrative', 'Operations', 'Production', 'Food/Beverage', 'Sales', 'Garage'];

  selectedDepartments = [];

  alertMessage = "";

  constructor() { }

  ngOnInit() {
  }

  onClickMe(dept) {
    var index = this.selectedDepartments.indexOf(dept);
    if (index > -1) {
      this.selectedDepartments.splice(index, 1);
    } else {
      this.selectedDepartments.push(dept);
    }
  }

  sendMessage(msg) {
    console.log(msg);
  }
}


