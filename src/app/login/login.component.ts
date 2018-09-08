import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'rcc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../app.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  hideInvalidMsg = true;
  // Used to display error messages
  emailValid = true;
  passwordValid = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private validationService: ValidationService) { }

  ngOnInit() {
  }

  /**
   * Login with entered credentials.
   * If successful it will take the user to the home page.
   * Upon failure, the user will remain on the login page and will be asked to re-enter credentials.
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

  /**
   * Validate Email verifies that the email is in a valid format
   * Returns true if the email is valid
   * @param email - string value of the email field
   */
  validateEmail(email) {
    this.emailValid = this.validationService.validateEmail(email);
  }

  /**
   * Validate Email verifies that the email is in a valid format
   * Returns true if the password is valid
   * @param password - string value of the password field
   */
  validatePassword(password) {
    this.passwordValid = this.validationService.validatePassword(password);
  }
}
