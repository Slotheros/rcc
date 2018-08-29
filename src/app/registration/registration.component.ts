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

  confirmPassword = "";

  constructor() { }

  ngOnInit() {
  }

  onRegister(registerInfo) {
    console.log("THIS IS A TEST: " + registerInfo.value.fName);
    console.log(this.model.fName + "\n"
  + this.model.lName + "\n"
+ this.model.email + "\n"
+ this.model.department + "\n");

    console.log("CHECKING: " + this.model.password + " second pass =  " + this.confirmPassword);
    if (this.model.password != this.confirmPassword) {
      console.log("DOES NOT MATCH") 
      // display error message
    } else {
      console.log("Login");
      //check all other fields create a new user in the database
      //route user to the login page.
  }
  }

  submit(info: NgForm){
    this.model = new User(info.value.fName, info.value.lName, info.value.email, info.value.phoneNum, info.value.department, info.value.password); 
    console.log(this.model); 
    console.log("TEST");


  }

}
