import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { AcknowledgePolicyService } from '../services/acknowledge-policy.service';
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

  userID: number = null;
  dialogRef: MatDialogRef<EditPolicyDialogComponent>;
  newPolicy: Policy;
  ackPolicies = Array<Policy>();
  unackPolicies = Array<Policy>();

  constructor( private alertsService: AlertsService, private authService: AuthService,
               private router: Router, private dialog: MatDialog, private globals: Globals,
               private acknowledgePolicyService: AcknowledgePolicyService) { }

  ngOnInit() {

    this.authService.loggedIn().subscribe(result => {
      // Set userID to what was given from authService
      this.userID = result['eId'];
      console.log('Got userID: ' + this.userID);

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
      console.log('Searching for ack policies using eId: ' + this.userID);
      this.acknowledgePolicyService.getAcknowledged(this.userID).subscribe(result => {
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
            'acknowledged': true,
            'date': policy['date']
          } as Policy;
          this.ackPolicies.push(p);
        }
      }, error => {
        console.log('Error retrieving ack policies');
        console.log(error);
      });
    });
  }

  // Acknowledge a policy using the policy ID and user ID
  acknowledgePolicy(policyID: number, userID: number) {
    console.log('Setting policy #' + policyID + ' to acknowledged for userID ' + userID + '...');
    // TODO: check if the policy was acknowledged
    // console.log('ack?: ' + this.acknowldgePolicyService);

    this.acknowledgePolicyService.acknowledgePolicy(policyID, userID).subscribe(result => { }, error => {
      console.log('check this error: ' + error);
      // this.errorDialogService.setErrorMsg(error.errMsg);
      // this.errorDialogService.openDialog(this.errorDialogService.getErrorMsg());
    });
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
