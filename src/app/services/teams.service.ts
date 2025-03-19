import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http : HttpClient) { }

  CreateTeam(team : Team){
    return this.http.post<Team>('Teams/Create',team)
  }

  GetTeamsByClub(clubId : number){
    return this.http.get<Team[]>(`Teams/GetTeamByClub/${clubId}`)
  }
}
