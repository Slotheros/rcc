import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { AcknowledgePolicyService } from '../services/acknowledge-policy.service';
import { Policy } from '../policy';
import { Globals } from '../globals';
import { MatDialog, MatDialogConfig, MatDialogRef, MatExpansionPanel } from '@angular/material';
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
  newPolicy: Policy = this.globals.EMPTY_POLICY;
  editPolicy: Policy = this.globals.EMPTY_POLICY;
  ackPolicies = Array<Policy>();
  unackPolicies = Array<Policy>();
  allPolicies = Array<Policy>(); // used for admin purposes
  userType: number = null;

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  constructor( private alertsService: AlertsService, private authService: AuthService,
               private router: Router, private dialog: MatDialog, private globals: Globals,
               private acknowledgePolicyService: AcknowledgePolicyService) { }

  ngOnInit() {

    this.authService.loggedIn().subscribe(result => {
      // Set userID to what was given from authService
      this.userID = result['eId'];
      this.userType = result['usertype']['id'];
    }, error => {
      this.router.navigate(['login']);
    }, () => {
      // After userID is found, initialize the ack and unack policy arrays
      this.updatePolicyArrays();
    });
  }

  // Calls for all policies relevant to that user whenever a change in policies occurs
  // HTML values are updated automatically when this function is called
  updatePolicyArrays() {
    this.ackPolicies = Array<Policy>();
    this.unackPolicies = Array<Policy>();
    this.allPolicies = Array<Policy>();

    // If the user is an admin, get all of the policies
    if (this.userType === this.SUPERUSER || this.userType === this.ADMIN || this.userType === this.DPTHEAD) {
      this.acknowledgePolicyService.getAllPolicies().subscribe(result => {
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
            'date': policy['date'].substr(0, 10)
          } as Policy;
          this.allPolicies.push(p);
        }
      }, error => {
        console.log('Error retrieving unacknowl policies');
        console.log(error);
      });
    }

    // Get all of the unacknowledged policies
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
          'date': policy['date'].substr(0, 10)
        } as Policy;
        this.unackPolicies.push(p);
      }
    }, error => {
      console.log('Error retrieving unack policies');
      console.log(error);
    });

    // Get all of the acknowledged policies
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
          'date': policy['date'].substr(0, 10)
        } as Policy;
        this.ackPolicies.push(p);
      }
    }, error => {
      console.log('Error retrieving ack policies');
      console.log(error);
    });
  }

  // Acknowledge a policy using the policy ID and user ID
  acknowledgePolicy(policyID: number, userID: number) {
    this.acknowledgePolicyService.acknowledgePolicy(policyID, userID).subscribe(
      result => { this.updatePolicyArrays(); }, error => { console.log('check this error: ' + error); });
  }

  // Delete a policy, using the policy ID
  deletePolicy(policy: Policy) {
    // Can only delete if you are an admin
    if (this.userType === this.SUPERUSER || this.userType === this.ADMIN || this.userType === this.DPTHEAD) {
      this.acknowledgePolicyService.deletePolicy({policyId: policy.id}).subscribe(
        result => {
          this.updatePolicyArrays();
        }, error => {
          console.log('check this error: ' + error);
        });
    }
  }

  // opens the edit dialog box for creating a policy
  openCreatePolicyDialog() {
    // Reset the new policy to an empty Policy object
    console.log('Editing policy: ' + this.newPolicy.title);

    // Open dialog and keep a reference to it
    this.dialogRef = this.dialog.open(EditPolicyDialogComponent, {
      data: {
        title: this.newPolicy.title,
        description: this.newPolicy.description,
        url: this.newPolicy.url,
        departments: this.newPolicy.departments
      }
    });

    // After the dialog is close, handle the data from the forms
    this.dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.acknowledgePolicyService.createPolicy(data).subscribe(result => {
          // update policies array to show the changes
          this.updatePolicyArrays(); }, error => {
          console.log('Failure adding new policy to the DB.');
        });
      } else {
        console.log('Policy is null');
      }
    });
  }

  // Opens Edit Policy Dialog
  openEditPolicyDialog(policy: Policy) {
    // Reset the new policy to an empty Policy object
    this.editPolicy = this.globals.EMPTY_POLICY;

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
        if (data) {
          data['policyId'] = policy.id;
          console.log('Sending to backend:');
          console.log(data);
          this.acknowledgePolicyService.updatePolicy(data).subscribe(result => {
            // update policies array to show the changes
            this.updatePolicyArrays(); }, error => {
            console.log('Failure to change policy to the DB.');
            console.log(error);
          });
        } else {
          console.log('Edit cancelled');
        }
      } else {
        console.log('Policy is null');
      }
    });
  }
}
