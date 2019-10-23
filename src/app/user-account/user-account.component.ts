import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {NotificationService} from "../shared/notification.service";
import {DialogService} from "../shared/dialog.service";
import {UserAccountService} from "../service/user-account.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(private service: UserAccountService,
              private dialog:MatDialog,private notificationService:NotificationService,
              private dialogService: DialogService) { }
  uploadResponse = { status: '', message: '', filePath: '' }
  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = <File>event.target.files[0];
      this.service.userProfilePic = event.target.files[0];
      console.log(file);

    }
  }

  onSubmit() {
    let resp = this.service.save();
    alert(resp);
  }
}
