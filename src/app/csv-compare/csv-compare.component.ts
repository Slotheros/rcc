import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { MatTableModule, MatTableDataSource } from '@angular/material';
import {CsvCompareService} from '../services/csv-compare.service';


@Component({
  selector: 'rcc-csv-compare',
  templateUrl: './csv-compare.component.html',
  styleUrls: ['./csv-compare.component.scss']
})
export class CsvCompareComponent implements OnInit {

  userID: number = null;
  userType: number = null;
  newEmployees: Array<Employee>;
  existingEmployees: Array<Employee>;
  newDataSource;
  existingDataSource;
  displayedColumns: string[];

  constructor(private authService: AuthService,
              private router: Router,
              private csvService: CsvCompareService) { }

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
      this.newEmployees = [
        {
          fname: 'Ryan',
          lname: 'Bower',
          phone: 2678858748,
          email: 'ryan@gmail.com',
          active: false
        } as Employee
        ];
      this.existingEmployees = [
        {
          fname: 'Louie',
          lname: 'Trapani',
          phone: 1724902837,
          email: 'louie@gmail.com',
          active: true
        } as Employee,
        {
          fname: 'Rana',
          lname: 'Vem',
          phone: 3678492643,
          email: 'rana@gmail.com',
          active: false
        } as Employee
        ];
      this.getEmployees();
    });
  }

  getEmployees() {
     // TODO: get init array values here
     this.csvService.getNewEmployees().pipe().subscribe(result => {
       this.newEmployees = result as Array<Employee>;
     }, error => {
       console.log('Error retrieving new employees');
       console.log(error);
     });
     this.csvService.getExistingEmployees().pipe().subscribe(result => {
       this.existingEmployees = result as Array<Employee>;
     }, error => {
       console.log('Error retrieving new employees');
       console.log(error);
     });
     this.displayedColumns = ['fname', 'lname', 'phone', 'email'];
  }
}
