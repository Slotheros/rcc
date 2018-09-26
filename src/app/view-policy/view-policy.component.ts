import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { Policy } from '../policy';

@Component({
  selector: 'rcc-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss']
})
export class ViewPolicyComponent implements OnInit {

  userID = 123456;
  ackPolicies = [
    {
      id: 123,
      description: 'Dummy Policy that IS acknowledged',
      url: 'www.google.com',
      acknowledged: true,
      date: '05/21/18'
    },
    {
      id: 124,
      description: 'Another Dummy Policy that is also acknowledged',
      url: 'www.google.com',
      acknowledged: true,
      date: '09/26/18'
    },
  ];

  unackPolicies = [
    {
      id: 69,
      description: 'Dummy Policy that is UN-acknowledged',
      url: 'www.google.com',
      acknowledged: false,
      date: null
    },
    {
      id: 8008135,
      description: 'Also a different Dummy Policy that is UN-acknowledged',
      url: 'www.google.com',
      acknowledged: false,
      date: null
    }
  ];

  constructor( private alertsService: AlertsService, private authService: AuthService,
               private router: Router) { }

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
}
