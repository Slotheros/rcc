import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Registrant } from '../registrant';
import { UsersService } from '../services/users.service';
import { ValidationService } from '../services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rcc-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  departments = ['Sales', 'Garage', 'Admin(HR)', 'Food & Beverage', 'Productions'];
  registrant: Registrant;
  pwdValidation: string;

  constructor(
    private usersService: UsersService,
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.registrant = {
      fName: undefined,
      lName: undefined,
      email: undefined,
      phoneNum: undefined,
      department: undefined,
      password: undefined
    };
  }


  register() {
    // Registration page fields validation
    if (!(this.validationService.validateRegistrant(this.registrant))) {
      // TODO: add error messages
      return;
    }
    this.usersService.register(this.registrant).subscribe(result => {
      if (result) {
        this.router.navigate(['home']);
      } else { }
    }, error => {
      console.log('Error occurred');
    });
  }
//   onRegister(registerInfo) {
//     console.log("THIS IS A TEST: " + registerInfo.value.fName);
//     console.log(this.model.fName + "\n"
//   + this.model.lName + "\n"
// + this.model.email + "\n"
// + this.model.department + "\n");

//     console.log("CHECKING: " + this.model.password + " second pass =  " + this.confirmPassword);
//     if (this.model.password != this.confirmPassword) {
//       console.log("DOES NOT MATCH")
//       // display error message
//     } else {
//       console.log("Login");
//       //check all other fields create a new user in the database
//       //route user to the login page.
//   }
//   }
}
