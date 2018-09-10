import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  errorMsg = "";

  constructor(public dialog: MatDialog) { }


  setErrorMsg(error: string) {
    this.errorMsg = error;
  }

  getErrorMsg():string {
    return this.errorMsg;
  }

  openDialog(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {data: errorMsg});
  }
}

// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'dialog-content-example-dialog.html',
// })
// export class DialogContentExampleDialog {}
