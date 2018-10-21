import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rcc-csv-compare',
  templateUrl: './csv-compare.component.html',
  styleUrls: ['./csv-compare.component.scss']
})
export class CsvCompareComponent implements OnInit {

  userID: number = null;
  userType: number = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    // authenticate the user
    this.authService.loggedIn().subscribe(result => {
      // Set userID to what was given from authService
      this.userID = result['eId'];
      this.userType = result['usertype']['id'];
    }, error => {
      this.router.navigate(['login']);
    }, () => {
      // After userID is found, get the csv array
      // TODO: get init array values here
    });
  }

}
