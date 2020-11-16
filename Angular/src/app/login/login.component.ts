import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';

import {ToastrService} from 'node_modules/ngx-toastr';
import { ShareService } from '../share.service';
import {NgForm} from "@angular/forms"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ShareService,  private router:Router, private toastr: ToastrService) { }
  
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
              //alert("Login Success");
              //using toastr
              this.toastr.success("Login Success","Success");
              this.router.navigate(['/quotes']);
              },
      error => (
        //alert("Wrong Password or Name")
        this.toastr.error("Wrong Password or Name","Error")
  
        )
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
      res => {this.toastr.error("User exist, use different name and email","Error")},
      error => {this.service.addUser(u).subscribe(
        res => {this.toastr.success("Add New User successful","Success")},
        error => {this.toastr.error("Cannot add user","Error")}
      )}
      
    )}

  }

}
