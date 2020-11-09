import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from '../guard.service';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ShareService,private route:Router, private guard: GuardService ) { }

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
      res => {alert("Login Success");
               this.route.navigate(['/quotes'])},
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
