import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertsService} from '../services/alerts.service';
import {AuthService} from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { Email } from '../email';
import { MatSnackBar } from '@angular/material';
import { ErrorDialogService } from '../services/error-dialog.service';



@Component({
  selector: 'rcc-email-hr',
  templateUrl: './email-hr.component.html',
  styleUrls: ['./email-hr.component.scss']
})

export class EmailHRComponent implements OnInit {

  email: Email;
  currentUser = null;
  emailMessage = null;
  constructor(private alertsService: AlertsService, 
              private authService: AuthService,
              private router: Router, 
              private emailService: EmailService,
              private errorDialogService: ErrorDialogService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
      this.currentUser = result['email'];
    }, error => {
      this.router.navigate(['login']);
    });

    this.email = {
      message: undefined,
      email: undefined,
    };
  }

  sendMessage(msg: String){
    this.email.message = this.emailMessage;
    this.email.email = this.currentUser;
    this.emailService.sendEmail(this.email).subscribe(result => {
      if (result) {
        console.log("HERE");
        // reset values on the page
        this.email = {
          message: undefined,
          email: undefined,
        };
        this.emailMessage = '';
        // show a snackBar that says the alert was successfully sent
        this.snackBar.open('Email successfully sent', 'Close');
      }
    }, error => {
      this.errorDialogService.setErrorMsg(error.errMsg);
      this.errorDialogService.openDialog(this.errorDialogService.getErrorMsg());
    });
  }
}
