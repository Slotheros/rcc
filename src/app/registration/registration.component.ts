import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Registrant } from '../registrant';
import { Department } from '../department';
import { UsersService } from '../services/users.service';
import { ConfigService } from '../services/config.service';
import { ValidationService } from '../services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogService } from '../services/error-dialog.service';

@Component({
  selector: 'rcc-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None


})
export class RegistrationComponent implements OnInit {
  departments: Department[];
  registrant: Registrant;
  passwordRepeated: string;
  phone1 = '';
  phone2 = '';
  phone3 = '';
  fNameValid = true;
  lNameValid = true;
  phoneValid = true;
  emailValid = true;
  pw1Valid = true;
  pw2Valid = true;
  pwMatch = true;


  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private router: Router,
    private errorDialogService: ErrorDialogService
  ) { }

  ngOnInit() {
    this.registrant = {
      fName: undefined,
      lName: undefined,
      email: undefined,
      phoneNum: '',
      department: undefined,
      password: undefined
    };

    this.departments = this.configService.getDepartments();
  }

  register() {
    this.registrant.phoneNum = '+1' + this.phone1 + this.phone2 + this.phone3;
    // Registration page fields validation
    if (!(this.validationService.validateRegistrant(this.registrant))) {
      // TODO: add error messages
      return;
    }
    this.usersService.register(this.registrant).subscribe(result => {
      if (result) {
        this.router.navigate(['login']);
      } else { }
    }, error => {
      this.errorDialogService.setErrorMsg(error.errMsg);
      this.errorDialogService.openDialog(this.errorDialogService.getErrorMsg());
    });
  }

  validateField(value, type) {
    console.log('validating a field');
    switch (type) {
      case 'fName' : this.fNameValid = this.validationService.validateName(value); break;
      case 'lName' : this.lNameValid = this.validationService.validateName(value); break;
      case 'email' : this.emailValid = this.validationService.validateEmail(value); break;
      case 'phone' : this.registrant.phoneNum = '+1' + this.phone1 + this.phone2 + this.phone3;
        this.phoneValid = this.validationService.validatePhoneNumber(this.registrant.phoneNum); break;
      case 'pw1' : this.pw1Valid = this.validationService.validatePassword(value); break;
      case 'pw2' : this.pw2Valid = this.validationService.validatePassword(value); break;
    }
  }

  passwordMatch(pw1, pw2) {
    this.pwMatch = this.validationService.validatePasswordMatch(pw1, pw2);
  }
}
