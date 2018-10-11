import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { Policy } from '../policy';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import {EditPolicyDialogComponent} from '../edit-policy-dialog/edit-policy-dialog.component';

@Component({
  selector: 'rcc-view-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  userID = 123456;
  dialogRef: MatDialogRef<EditPolicyDialogComponent>;
  ackPolicies = [
    {
      id: 123,
      title: 'Food Dummy Policy',
      description: 'Dummy Policy that IS acknowledged',
      url: 'http://www.google.com',
      acknowledged: true,
      date: '05/21/18',
      departments: [1, 2]
    },
    {
      id: 124,
      title: 'Parking Dummy Policy',
      description: 'Another Dummy Policy that is also acknowledged',
      url: 'http://www.google.com',
      acknowledged: true,
      date: '09/26/18',
      departments: [2]
    },
  ];

  unackPolicies = [
    {
      id: 69,
      title: 'Sexual Harassment Dummy Policy',
      description: 'Dummy Policy that is UN-acknowledged',
      url: 'http://www.google.com',
      acknowledged: false,
      date: null,
      departments: [1]
    },
    {
      id: 8008135,
      title: 'Dress Code Dummy Policy',
      description: 'Also a different Dummy Policy that is UN-acknowledged',
      url: 'http://www.google.com',
      acknowledged: false,
      date: null,
      departments: [3, 4]
    }
  ];

  constructor( private alertsService: AlertsService, private authService: AuthService,
               private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
    }, error => {
      this.router.navigate(['login']);
    });
    // hit get policy endpoint and populate policies[]
  }

  updatePolicyInDB(policyID: number, userID: number) {
    console.log('Setting policy #' + policyID + ' to acknowledged for userID ' + userID + '...');
    return false;
  }

  // Opens Edit Policy Dialog
  openEditPolicyDialog(policy: Policy) {
    console.log('Editing policy: ' + policy.title);
    console.log(policy);

    this.dialogRef = this.dialog.open(EditPolicyDialogComponent, {
      data: {
        title: policy ? policy.title : '',
        description: policy ? policy.description : '',
        url: policy ? policy.url : '',
        departments: policy ? policy.departments : ''
      }
    });
  }
}
