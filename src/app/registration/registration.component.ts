import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Registrant } from '../registrant';
import { UsersService } from '../services/users.service';
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
    this.usersService.register(this.registrant).subscribe(result => {
      if (result) {
        this.router.navigate(['home']);
      } else { }
    });
  }
}
