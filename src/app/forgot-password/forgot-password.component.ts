import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'rcc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  resetPasswordObj = {};
  

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.resetPasswordObj = {
      eId: undefined,
      password: undefined,
      email: undefined

    }
  }

  sendEmailForPasswordReset(){
    console.log(this.email);
    this.resetPasswordObj['email'] = this.email;
    this.usersService.forgotPassword(this.resetPasswordObj).subscribe(result =>{
      this.router.navigate(['/login']);
    }, error => {

    });
  }
}
