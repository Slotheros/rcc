import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Department } from '../department';
import { Globals } from '../globals';
import { SelectedDepartmentsService } from '../services/selected-departments.service';


@Component({
  selector: 'rcc-select-departments',
  templateUrl: './select-departments.component.html',
  styleUrls: ['./select-departments.component.scss']
})
export class SelectDepartmentsComponent implements OnInit {

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  allEmployees = 'All Employees';
  departments: Department[];
  selectedDepartments = [];

  isDisabled = false;
  isDisabledGroup = false;
  isChecked = false;
  userType = null;
  userDeptName = null;
  currentDeptObj = null;

  constructor(
    private usersService: UsersService,
    private alertsService: AlertsService,
    private authService: AuthService,
    private router: Router,
    private globals: Globals,
    private selectedDepartmentsService: SelectedDepartmentsService) { 
      this.departments = globals.departments;
    }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
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
    this.selectedDepartmentsService.setSelectedDepartments(this.selectedDepartments);
  }
}
