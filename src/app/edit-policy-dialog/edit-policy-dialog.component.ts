import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Policy } from '../policy';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Globals } from '../globals';
import {filter} from 'rxjs/operators';
import { Department } from '../department';
import { SelectDepartmentsComponent } from '../select-departments/select-departments.component';
import { SelectedDepartmentsService } from '../services/selected-departments.service';


@Component({
  selector: 'rcc-edit-policy-dialog',
  templateUrl: './edit-policy-dialog.component.html',
  styleUrls: ['./edit-policy-dialog.component.scss']
})
export class EditPolicyDialogComponent implements OnInit {

  policy: Policy;
  form: FormGroup;
  selectedDepartments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPolicyDialogComponent>,
    private globals: Globals,
    private selectedDepartmentsService: SelectedDepartmentsService,
    @Inject(MAT_DIALOG_DATA) public data: Policy ) {
    this.policy = data;
  }

  // TODO: use our own validators, not required
  ngOnInit() {
    this.form = this.fb.group({
      title: [this.policy.title, Validators.required],
      description: [this.policy.description, Validators.required],
      url: [this.policy.url, Validators.required],
    });
  }

  getSelected() {
    this.selectedDepartments = this.selectedDepartmentsService.getSelectedDepartments();
    return this.selectedDepartments;
  }

  submit(form) {
    const data = this.form.getRawValue();
    data['depts'] = this.getSelected();
    return this.dialogRef.close(data);
  }

  save() {
    // return this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
