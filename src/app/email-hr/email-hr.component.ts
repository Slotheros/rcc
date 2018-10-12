import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertsService} from '../services/alerts.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'rcc-email-hr',
  templateUrl: './email-hr.component.html',
  styleUrls: ['./email-hr.component.scss']
})
export class EmailHRComponent implements OnInit {

  currentUser = null;
  emailMessage = null;
  constructor(private alertsService: AlertsService, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
      this.currentUser = result['email'];
    }, error => {
      this.router.navigate(['login']);
    });
  }

  sendMessage(msg: String){
    console.log(msg); 
  }
}
