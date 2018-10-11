import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Policy } from '../policy';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Globals } from '../globals';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'rcc-edit-policy-dialog',
  templateUrl: './edit-policy-dialog.component.html',
  styleUrls: ['./edit-policy-dialog.component.scss']
})
export class EditPolicyDialogComponent implements OnInit {

  form: FormGroup;
  policy: Policy;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPolicyDialogComponent>,
    private globals: Globals,
    @Inject(MAT_DIALOG_DATA) public data: Policy ) {
    this.policy = data;

    this.form = fb.group({
      title: [this.policy.title, Validators.required],
      description: [this.policy.description, Validators.required],
      url: [this.policy.url, Validators.required],
      department: [this.policy.departments, Validators.required]
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: '',
      description: '',
      url: '',
      departments: []
    });
  }

  submit(form) {
    this.dialogRef.close(`${form.value}`);
  }

  save() {
    this.dialogRef.close(this.form.value);
    console.log('dialog ref: ');
    console.log(this.dialogRef.afterClosed().pipe(filter(title => title)));
  }

  close() {
    this.dialogRef.close();
  }
}
