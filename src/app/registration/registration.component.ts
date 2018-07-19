import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user'; 

@Component({
  selector: 'rcc-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  departments = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];
  model: User = new User("", "", "", "", "", ""); 

  constructor() { }

  ngOnInit() {
  }

  submit(info: NgForm){
    this.model = new User(info.value.fName, info.value.lName, info.value.email, info.value.phoneNum, info.value.department, info.value.password); 
    console.log(this.model); 
  }

}
