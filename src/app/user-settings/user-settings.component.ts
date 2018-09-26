import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Department } from '../department'; 
import { ConfigService } from '../services/config.service';
import {AlertsService} from '../services/alerts.service';
import {Router} from '@angular/router';


@Component({
  selector: 'rcc-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  departments: Department[];

  constructor(private alertsService: AlertsService,
      private authService: AuthService,
      private configService: ConfigService,
      private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      // populates departments
      this.departments = this.configService.getDepartments();
    }, error => {
      this.router.navigate(['login']);
    });
  }
}
