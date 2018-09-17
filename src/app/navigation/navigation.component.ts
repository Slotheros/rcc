import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'rcc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  admin = true;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  callLogoutService() {
    console.log('calling logout service');
    this.authService.logout().subscribe(result => console.log('working'), error => console.log('not working'));

  }

}
