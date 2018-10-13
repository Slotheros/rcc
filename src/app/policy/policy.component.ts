import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { Policy } from '../policy';
import { Globals } from '../globals';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { EditPolicyDialogComponent } from '../edit-policy-dialog/edit-policy-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'rcc-view-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  readonly SUPERUSER:number = 1;
  readonly ADMIN:number = 2;
  readonly STANDARD:number = 3;
  readonly DPTHEAD:number = 4;
  
  userID = 123456;
  dialogRef: MatDialogRef<EditPolicyDialogComponent>;
  newPolicy: Policy;
  userType: number = null;

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
               private router: Router, private dialog: MatDialog, private globals: Globals) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
      this.userType = result['usertype']['id'];
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
    // Reset the new policy to an empty Policy object
    this.newPolicy = this.globals.EMPTY_POLICY;

    console.log('Editing policy: ' + policy.title);

    // Open dialog and keep a reference to it
    this.dialogRef = this.dialog.open(EditPolicyDialogComponent, {
      data: {
        title: policy ? policy.title : '',
        description: policy ? policy.description : '',
        url: policy ? policy.url : '',
        departments: policy ? policy.departments : ''
      }
    });

    // After the dialog is close, handle the data from the forms
    this.dialogRef.afterClosed().subscribe(data => {
      if (policy) {
        console.log('Returned from Edit Policy Form:');
        console.log(data);
      } else {
        console.log('Policy is null');
      }
    });
  }
}
