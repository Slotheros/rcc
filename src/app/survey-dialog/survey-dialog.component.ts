import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Survey } from '../survey';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Globals } from '../globals';
import {filter} from 'rxjs/operators';
import { Department } from '../department';
import { SelectDepartmentsComponent } from '../select-departments/select-departments.component';
import { SelectedDepartmentsService } from '../services/selected-departments.service';


@Component({
  selector: 'rcc-edit-survey-dialog',
  templateUrl: './survey-dialog.component.html',
  styleUrls: ['./survey-dialog.component.scss']
})
export class SurveyDialogComponent implements OnInit {

  survey: Survey;
  form: FormGroup;
  selectedDepartments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SurveyDialogComponent>,
    private globals: Globals,
    private selectedDepartmentsService: SelectedDepartmentsService,
    @Inject(MAT_DIALOG_DATA) public data: Survey ) {
    this.survey = data;
  }

  // TODO: use our own validators, not required
  ngOnInit() {
    this.form = this.fb.group({
      title: [this.survey.title, Validators.required],
      description: [this.survey.description, Validators.required],
      url: [this.survey.url, Validators.required],
    });
  }

  getSelected() {
    this.selectedDepartments = this.selectedDepartmentsService.getSelectedDepartments();
    return this.selectedDepartments;
  }

  submit(form) {
    const data = this.form.getRawValue();
    data['depts'] = this.getSelected();
    if (
      data['url'].substr(0, 7) !== 'http://'
      && data['url'].substr(0, 8) !== 'https://'
      && data['url'] !== '') {
      data['url'] = 'http://' + data['url'];
    }
    return this.dialogRef.close(data);
  }

  save() {
    // return this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
