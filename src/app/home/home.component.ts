import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UsersService } from '../services/users.service';
import { Policy } from '../policy';
import { PolicyService } from '../services/policy.service';
import { Survey } from '../survey';
import { SurveyService } from '../services/survey.service';


const URL = 'http://localhost:3000/users/csvCompare';

@Component({
  selector: 'rcc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userID:number = null;
  userType:number = null;
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'csvCompare'});
  newPolicy: Policy;
  ackPolicies = Array<Policy>();
  unackPolicies = Array<Policy>();
  ackSurveys = Array<Survey>();
  unackSurveys = Array<Survey>();

  constructor(private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private acknowledgePolicyService: PolicyService,
    private surveyService: SurveyService) {
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
      this.userID = result['eId'];
      this.userType = result['usertype']['id'];
      // console.log("who is logged in var: " + UsersService.userType);
      // console.log("who is logged in method: " + UsersService.getUser);
    }, error => {
      this.router.navigate(['login']);
    }, () => {
      // After userID is found, initialize the ack and unack policy arrays
      console.log('Searching for unack policies using eId: ' + this.userID);
      this.acknowledgePolicyService.getUnacknowledged(this.userID).subscribe(result => {
        for (const policy of result as Array<Object>) {
          const depts = [];
          if (policy['deptSales']) { depts.push({'id': 1}); }
          if (policy['deptGarage']) { depts.push({'id': 2}); }
          if (policy['deptAdmin']) { depts.push({'id': 3}); }
          if (policy['deptFoodBeverage']) { depts.push({'id': 4}); }
          if (policy['deptProduction']) { depts.push({'id': 5}); }

          const p = {
              'id': policy['policyID'],
              'title': policy['title'],
              'description': policy['description'],
              'departments': depts,
              'url': policy['url'],
              'acknowledged': false,
              'date': policy['date']
            } as Policy;
          this.unackPolicies.push(p);
        }
        console.log('Unack Policies:');
        console.log(this.unackPolicies);
      }, error => {
        console.log('Error retrieving unack policies');
        console.log(error);
      });
      this.surveyService.getUnacknowledged(this.userID).subscribe(result => {
        for (const survey of result as Array<Object>) {
          const depts = [];
          if (survey['deptSales']) { depts.push({'id': 1}); }
          if (survey['deptGarage']) { depts.push({'id': 2}); }
          if (survey['deptAdmin']) { depts.push({'id': 3}); }
          if (survey['deptFoodBeverage']) { depts.push({'id': 4}); }
          if (survey['deptProduction']) { depts.push({'id': 5}); }
  
          const p = {
            'id': survey['surveyID'],
            'title': survey['title'],
            'description': survey['description'],
            'departments': depts,
            'url': survey['url'],
            'acknowledged': false,
            'date': survey['date'].substr(0, 10)
          } as Survey;
          this.unackSurveys.push(p);
        }
      }, error => {
        console.log('Error retrieving unack surveys');
        console.log(error);
      });

    });
  }
}
