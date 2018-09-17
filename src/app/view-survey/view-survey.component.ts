import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {AlertsService} from '../services/alerts.service';

@Component({
  selector: 'rcc-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss']
  // providers: [{provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}]
})
export class ViewSurveyComponent implements OnInit {

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
