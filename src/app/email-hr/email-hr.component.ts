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

  username = 'testUser1';
  emailMessage = 'emailMessage';
  alertMessage = 'alertMessage';
  constructor(private alertsService: AlertsService, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
    }, error => {
      this.router.navigate(['login']);
    });
  }

  sendMessage(msg: String){
    console.log(msg); 
  }
}
