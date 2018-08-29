import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rcc-email-hr',
  templateUrl: './email-hr.component.html',
  styleUrls: ['./email-hr.component.scss']
})
export class EmailHRComponent implements OnInit {

  username = "testUser1";
  constructor() { }

  ngOnInit() {
  }
}
