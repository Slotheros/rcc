import { Component, OnInit } from '@angular/core';
import { User } from '../user'; 

@Component({
  selector: 'rcc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  admin = true;
  constructor() { }

  ngOnInit() {
  }

}
