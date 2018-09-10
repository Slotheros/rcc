import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

// import { ErrorDialogService } from '../services/error-dialog.service';

@Component({
  selector: 'rcc-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  errorMsg = ""

  // constructor(private errorDialogService: ErrorDialogService) { 
  //   this.errorMsg = errorDialogService.getErrorMsg();
  // }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.errorMsg = data;
  }

  ngOnInit() {
  }

}
