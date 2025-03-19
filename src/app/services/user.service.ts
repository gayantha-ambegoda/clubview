import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInRequest } from '../models/sign-in-request';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  SignIn(signInRequest : SignInRequest){
    return this.http.post<AuthResponse>('User/SignIn',signInRequest);
  }

  SignUp(userRequest : User){
    return this.http.post<AuthResponse>('User/SignUp',userRequest);
  }
}
