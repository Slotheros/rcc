import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SelectedDepartmentsService} from '../services/selected-departments.service';
import {PolicyDialogComponent} from '../policy-dialog/policy-dialog.component';
import {Globals} from '../globals';
import {AuthService} from '../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Employee} from '../employee';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'rcc-ack-list-dialog',
  templateUrl: './ack-list-dialog.component.html',
  styleUrls: ['./ack-list-dialog.component.scss']
})
export class AckListDialogComponent implements OnInit {

  policy = null;
  employees: Array<Employee>;
  displayedColumns = ['name', 'phone', 'email'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PolicyDialogComponent>,
    private globals: Globals,
    private selectedDepartmentsService: SelectedDepartmentsService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data ) {
      this.policy = data;
    }

  ngOnInit() {
    this.populateEmployees();
  }

  // calls the backend for all employees that haven't acknowledged this policy, and populates the 'employees' array
  populateEmployees() {
    this.usersService.getUnackedByPolicyID(this.policy.id).subscribe(result => {
      // update policies array to show the changes
      console.log('result of get by policy:');
      console.log(result);
      this.employees = result as Array<Employee>;
      }, error => {
      console.log('Failure to change policy to the DB.');
      console.log(error);
    });
  }
}

