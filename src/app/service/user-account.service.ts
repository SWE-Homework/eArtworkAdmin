import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ICategory} from "../model/ICategory";
import {IUserAccount} from "../model/IUser-account";

@Injectable({
  providedIn: 'root'
})

export class UserAccountService {

  constructor(private httpClient: HttpClient) { }

  formUserAccount: FormGroup=new FormGroup({
    userAccountId: new FormControl(null),
    firstName: new FormControl("",Validators.required),
    lastName: new FormControl("", ),
    email: new FormControl("", [Validators.required,Validators.email]),
    password: new FormControl("", Validators.required),
    //loginStatus: new FormControl(""),
    //roleUser: new FormControl(""),
    //userProfilePic: new FormControl(),
    //active: new FormControl("")
  });
  user:any;
  uploadURL = "http://localhost:8080/eartwork/api/uploadSingleFile";
  userAddUrl = "http://localhost:8080/eartwork/api/useraccount/add";
  userProfilePic: File = null;
  userProfilePicRui="";
  save() {

    const fd = new FormData();
    fd.append('file',this.userProfilePic, this.userProfilePic.name);
    this.httpClient.post(this.uploadURL, fd).subscribe(resp => {
        //this.userProfilePicRui = JSON.parse(JSON.stringify(resp)).fileName;
        console.log(JSON.parse(JSON.stringify(resp)));

        this.user = {
          userProfilePic: JSON.parse(JSON.stringify(resp)).fileName,
          userAccountId: null,
          firstName: this.formUserAccount.get('firstName').value,
          lastName: this.formUserAccount.get('lastName').value,
          email: this.formUserAccount.get('email').value,
          password: this.formUserAccount.get('password').value,

        }
        console.log(this.user);
        this.httpClient.post(this.userAddUrl, this.user).subscribe(resp => {
            return ({ message:"Delete was not successfull, error message :"});
          },
          error => {
            return ({ message:"Delete was not successfull, error message :" + error});
          }
        );

      },
      error => {
        this.user = {
          userProfilePic: "",
          userAccountId: null,
          firstName: this.formUserAccount.get('firstName').value,
          lastName: this.formUserAccount.get('lastName').value,
          email: this.formUserAccount.get('email').value,
          password: this.formUserAccount.get('password').value,

        }
        console.log(this.user);
        this.httpClient.post(this.userAddUrl, this.user).subscribe(resp => {
            return ({ message:"Delete was not successfull, error message :"});
          },
          error => {
            return ({ message:"Delete was not successfull, error message :" + error});
          }
        );


      }
    );

    // this.user = {
    //   userProfilePic: this.userProfilePicRui,
    //   userAccountId: null,
    //   firstName: this.formUserAccount.get('firstName').value,
    //   lastName: this.formUserAccount.get('lastName').value,
    //   email: this.formUserAccount.get('email').value,
    //   password: this.formUserAccount.get('password').value,
    //
    // }
    // console.log(this.user);
    // this.httpClient.post(this.userAddUrl, this.user).subscribe(resp => {
    //         return ({ message:"Delete was not successfull, error message :"});
    //   },
    //   error => {
    //     return ({ message:"Delete was not successfull, error message :" + error});
    //   }
    // );

  }

}
