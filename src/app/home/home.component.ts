import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UsersService } from '../services/users.service';

const URL = 'http://localhost:3000/users/csvCompare';

@Component({
  selector: 'rcc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'csvCompare'});

  constructor(private authService: AuthService,
    private router: Router, 
    private usersService: UsersService) {
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
      // console.log("who is logged in var: " + UsersService.userType);
      // console.log("who is logged in method: " + UsersService.getUser);
    }, error => {
      this.router.navigate(['login']);
    });
  }

}
