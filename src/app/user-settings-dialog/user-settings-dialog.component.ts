import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Globals } from '../globals';
import { Department } from '../department';
import { SelectedDepartmentsService } from '../services/selected-departments.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ManageUserSettings } from '../manageUserSettings';
import {Registrant} from '../registrant';

@Component({
  selector: 'rcc-user-settings-dialog',
  templateUrl: './user-settings-dialog.component.html',
  styleUrls: ['./user-settings-dialog.component.scss']
})
export class UserSettingsDialogComponent implements OnInit {

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  userSettings: ManageUserSettings;
  user: Registrant;
  form: FormGroup;
  selectedDepartments: Department[] = [];
  userType: number = null;
  userDeptName: string = null;
  currentDeptObj = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserSettingsDialogComponent>,
    private globals: Globals,
    private selectedDepartmentsService: SelectedDepartmentsService,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data ) {
    this.user = data;
  }

  // TODO: use our own validators, not required
  ngOnInit() {
    this.form = this.fb.group({
      department: [this.userSettings.department, Validators.required],
      userType: [this.userSettings.userType, Validators.required]
    });

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
      }
    }, error => {
      this.router.navigate(['login']);
    });
  }

  submit(form) {
    const data = this.form.getRawValue();
    return this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }
}
