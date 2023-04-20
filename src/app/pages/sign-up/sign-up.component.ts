import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private userService:UserService,
    private snack:MatSnackBar,
    ){}

  public user = {
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
  }


  formSubmit(){
    console.log(this.user);
    if(this.user.userName == '' || this.user.password == '' || 
    this.user.firstName == '' || this.user.lastName == '' || this.user.email == '')
    {
      // alert('Fields should not be empty !!');
      this.snack.open("Fields shouldn't be empty !!",'Ok',{duration:3000})
      return; 
    }
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        // alert('Success !!')
        Swal.fire("Success !!","User is registered.")
      },
      (error)=>{
        //error
        console.log(error);
        // alert('Something went wrong !!')
        this.snack.open("Something went wrong !!",'Ok',{duration:3000})
      }
      )

  }

}
