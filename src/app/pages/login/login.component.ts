import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginData = {
    userName:"",
    password:"",

  }
  constructor(private snack:MatSnackBar,private login:LoginService,private router : Router) {}
  formSubmit(){
    console.log('login form submitted');
    if(this.loginData.userName == '')
    {
      // alert('Fields should not be empty !!');
      this.snack.open("Username is required !!",'Ok',{duration:3000})
      return; 
    }
    if(this.loginData.password == '')
    {
      // alert('Fields should not be empty !!');
      this.snack.open("password is required !!",'Ok',{duration:3000})
      return; 
    }
    
    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        //login 
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            // redirect ...ADMIN: admin-dashboard
            // redirect ...NORMAL: normal-user-dashboard
            if(this.login.getUserRole()=="ADMIN")
            {
              // go to admin dashboard
              // window.location.href = "/admin";
              this.router.navigate(['admin']);
            }
            else if (this.login.getUserRole()=="Normal")
            {
              // go to user dashboard
              // window.location.href = "/user-dashboard";
              this.router.navigate(['user-dashboard']);
            }
            else{
              this.login.logout();
            }
          }
        )
      },
      (error)=>{
        console.log("Error !!")
        console.log(error);
        this.snack.open("Invalid credentials !! Try Again", 'Ok',{
          duration:3000,
        });
      }
    );
  }
}
