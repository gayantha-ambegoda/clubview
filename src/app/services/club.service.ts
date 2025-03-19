import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club, ClubRequest } from '../models/club';
import { UserMain, UserRoleRequest } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http : HttpClient) { }

  CreateClub(club:Club){
    return this.http.post<Club>('Clubs',club)
  }

  GetClubs(){
    return this.http.get<Club[]>('Clubs');
  }

  DeleteClub(id : number){
    return this.http.delete(`Clubs/${id}`)
  }

  GetClub(id : number){
    return this.http.get<Club>(`Clubs/${id}`)
  }

  GetClubUsers(id : number){
    return this.http.get<UserMain[]>(`Clubs/GetUsersByClub/${id}`)
  }

  AssignClubUsers(request : UserRoleRequest){
    return this.http.post<string>('Clubs/AssignUserToClub',request)
  }
}
