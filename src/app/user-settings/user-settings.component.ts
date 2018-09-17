import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertsService} from '../services/alerts.service';
import {Router} from '@angular/router';


@Component({
  selector: 'rcc-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(private alertsService: AlertsService, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
    }, error => {
      this.router.navigate(['login']);
    });
  }
}
