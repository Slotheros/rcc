import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'rcc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  hideInvalidMsg = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result); 
      if (result){
        this.router.navigate(['home']);
      }
    })
  }

  /**
   * Login with entered credentials. If successful will take the user to the
   * home page. Else the user will remain on the login page, and will be
   * asked to re-enter credentials.
   */
  login() {
    this.authService.login(this.email, this.password).subscribe(result => {
      if (result) {
        this.hideInvalidMsg = true;
        this.router.navigate(['home']);
      } else {
        this.hideInvalidMsg = false;
      }
    });
  }
}
