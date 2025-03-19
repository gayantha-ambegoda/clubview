import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { SignInRequest } from '../models/sign-in-request';
import { User } from '../models/user';

@Component({
  selector: 'app-sign-in-up',
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,FormsModule],
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.css'
})
export class SignInUpComponent {
  public isSignIn : boolean = true
  private readonly router = inject(Router)
  private readonly userService = inject(UserService)

  firstName : string = ''
  lastName : string = ''
  email : string = ''
  password : string = ''

  OnActionTaken(){
    if(this.isSignIn){
      this.userService.SignIn({email:this.email,password:this.password} as SignInRequest).subscribe({
        next: (response) => {
            localStorage.setItem('token',response.token)
            localStorage.setItem('email',response.email)
            this.router.navigate(['dashboard'])
        },
        error: (error) => {
          console.error(error)
        }
      })
    }else{
      this.userService.SignUp({
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        password:this.password
      } as User).subscribe({
        next:(response) => {
          localStorage.setItem('token',response.token)
          localStorage.setItem('email',response.email)
          this.router.navigate(['dashboard'])
        },
        error:(error) => {
          console.error(error)
        }
      })
    }
    //this.router.navigate(['dashboard'])
  }

  OnStateChange(){
    this.isSignIn = !this.isSignIn
  }
}
