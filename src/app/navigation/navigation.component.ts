import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rcc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  // variables
  readonly SUPERUSER:number = 1;
  readonly ADMIN:number = 2;
  readonly STANDARD:number = 3;
  readonly DPTHEAD:number = 4;
  userType: number = null;
  fName: string = null;
  helpUrl = '';
  // constructor
  constructor(private authService: AuthService,
    private usersService: UsersService,
    public router: Router) {}


  /**
   * ngOnInit checkes that user is logged in an permitted to view this specific
   * page or else they will be routed to the login page. It also initializes
   * user variables to display on the nav bar.
   */
  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      this.userType = result['usertype']['id'];
      this.fName = result['fname'];
      if (this.userType == 1) {
        this.helpUrl = "https://drive.google.com/open?id=1_kSeUNz8GpbqzapTf711_thi9EI_iCVg";
      } else if (this.userType == 2) {
        this.helpUrl = "https://drive.google.com/open?id=10rqJvS-Bf89l-ZqJdhukH0vyRPzFXIYT";
      } else if (this.userType == 3) {
        this.helpUrl = "https://drive.google.com/open?id=1v4tEJgMjGKi2C2C7I5OxUQKd4sG--x2y";
      } else if (this.userType == 4) {
        this.helpUrl = "https://drive.google.com/open?id=1ZyT_Wc1YhZqd3aFCELY5va_OcmxPqTxM";
      }
      }, error => {
      this.router.navigate(['login']);
    });
  }

  /**
   * callLogoutService will log the user out of the site by calling the
   * authService's logout function to kill their current session.
   */
  callLogoutService() {
    this.authService.logout().subscribe(result => {}, error => {});
  }

}
