import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {AlertsService} from '../services/alerts.service';

@Component({
  selector: 'rcc-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss']
})
export class ViewPolicyComponent implements OnInit {

  constructor( private alertsService: AlertsService, private authService: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
    }, error => {
      this.router.navigate(['login']);
    });
  }
}
