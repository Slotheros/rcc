import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { MatDialog, MatDialogConfig, MatDialogRef, MatExpansionPanel } from '@angular/material';
import { UserSettingsDialogComponent } from '../user-settings-dialog/user-settings-dialog.component';

@Component({
  selector: 'rcc-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
