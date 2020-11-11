import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';

import { ShareService } from '../share.service';
import {NgForm} from "@angular/forms"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ShareService,  private router:Router) { }
  
  @Input()
  Name:string;
  Email:string;
  Password:string;
  ConfirmPassword:string;


  ngOnInit(): void {
  }

  LoginClick(){
    var u ={
      Name:this.Name,
      Password: this.Password
    }
    this.service.getUserLogin(u.Name, u.Password).subscribe(
      res => {
              this.service.dologin = true;
              alert("Login Success");
              this.router.navigate(['/quotes']);
              },
      error => (alert("Wrong Password or Name"))
    )
  }

  SignupClick(){
    var u ={
      Name: this.Name,
      Email: this.Email,
      Password: this.Password,
    }
     
    var confirmpassword = this.ConfirmPassword
    if(confirmpassword != this.Password){
        alert("Password and Confirm Password are not match")
    } else{
    this.service.getUserExist(u.Name,u.Email).subscribe(
      res => {alert("User exist, use different name and email")},
      error => {this.service.addUser(u).subscribe(
        res => {alert("Add New User successful")},
        error => {alert("Cannot add user")}
      )}
      
    )}

  }

}
