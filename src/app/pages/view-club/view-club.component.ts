import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from '../../models/club';
import { ClubService } from '../../services/club.service';
import { switchMap } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { User, UserMain, UserRoleRequest } from '../../models/user';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { Field } from '../../models/fields';
import { FieldsService } from '../../services/fields.service';
import { Team } from '../../models/team';
import {MatCardModule} from '@angular/material/card';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-view-club',
  imports: [MatIconModule,MatCardModule,MatButtonModule,MatToolbarModule,MatTabsModule,MatTableModule,MatInputModule,MatFormFieldModule,FormsModule,MatSelectModule,ReactiveFormsModule,MatCheckboxModule],
  templateUrl: './view-club.component.html',
  styleUrl: './view-club.component.css'
})
export class ViewClubComponent implements OnInit {
  private readonly route = inject(ActivatedRoute)
  selectedClub : number = 0
  currentClub : Club | undefined
  clubUsers : UserMain[] = []
  clubTeams : Team[] = []
  clubFields : Field[] = []
  displayedColumns: string[] = ['id','firstName','lastName','email','role'];
  fieldDisplayedColumns: string[] = ['id','name','address','description','facilities','deckType','HasLighting','HasHeating','actions'];
  teamDisplayedColumns: string[] = ['id','name','memberType','birthYear'];

  fieldName = new FormControl('')
  fieldDescription = new FormControl('')
  fieldAddress = new FormControl('')
  fieldFacilities = new FormControl('')
  fieldDeckType = new FormControl('')
  hasLighting = new FormControl(false);
  hasHeating = new FormControl(false);

  teamName = new FormControl('')
  teamMemberType = new FormControl('')
  teamBirthYear = new FormControl(0)

  userEmail = new FormControl('')
  userRole = new FormControl('')

  private readonly clubservice = inject(ClubService)
  private readonly router = inject(Router)
  private readonly fieldService = inject(FieldsService)
  private readonly teamService = inject(TeamsService)

  ngOnInit(): void {
    var res = this.route.snapshot.paramMap.get('id')
    this.selectedClub = Number(res)
    this.clubservice.GetClub(this.selectedClub).subscribe({
      next:(response)=>{
        this.currentClub = response
        console.log(this.currentClub)
      },
      error:(error)=>{
        console.error(error)
      }
    });
    this.RefreshUsers()
    this.RefreshTeams()
    this.RefreshFields()
  }

  RefreshFields(){
    this.fieldService.GetFieldsByClub(this.selectedClub).subscribe({
      next:(response)=>{
        this.clubFields = response
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }

  RefreshTeams(){
    this.teamService.GetTeamsByClub(this.selectedClub).subscribe({
      next:(response)=>{
        this.clubTeams = response
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }

  ViewField(field : Field){
    this.router.navigate(['fields',field.id])
  }

  RefreshUsers(){
    this.clubservice.GetClubUsers(this.selectedClub).subscribe({
      next:(response)=>{
        this.clubUsers = response
        console.log(response)
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }

  getUserRole(user : UserMain) : string{
    var role = user.userRole.find(usrRole => usrRole.clubId == this.selectedClub)?.role
    return role ? role : ''
  }

  CreateField(){
    var field = new Field()
    field.name = this.fieldName.value ? this.fieldName.value : ''
    field.description = this.fieldDescription.value ? this.fieldDescription.value : ''
    field.address = this.fieldAddress.value ? this.fieldAddress.value : ''
    field.facilities = this.fieldFacilities.value ? this.fieldFacilities.value : ''
    field.deckType = this.fieldDeckType.value ? this.fieldDeckType.value : ''
    field.hasHeating = this.hasHeating.value == true ? true : false
    field.hasLighting = this.hasLighting.value == true ? true : false
    field.clubId = this.selectedClub
   
    this.fieldService.SaveField(field).subscribe({
      next:(response)=>{
        this.RefreshFields()
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }

  CreateUser(){
    if(this.userEmail.value && this.userEmail.value.length > 0 && this.userRole.value && this.userRole.value.length > 0){
      var request = {
        userEmail:this.userEmail.value,
        clubId:this.selectedClub,
        role:this.userRole.value
      }

      this.clubservice.AssignClubUsers(request).subscribe({
        next:(response) => {
          console.log(response)
          this.RefreshUsers()
        },
        error:(error)=>{
          console.error(error)
        }
      })
    }
  }

  CreateTeam(){
    var teamContent : Team = {
      id:0,
      name:this.teamName.value ?? '',
      memberType:this.teamMemberType.value ?? '',
      birthYear:this.teamBirthYear.value ?? 0,
      clubId:this.selectedClub,
      club:  new Club()
    }

    this.teamService.CreateTeam(teamContent).subscribe({
      next:(response)=>{
        this.RefreshTeams();
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }
  SignOut(){
    localStorage.removeItem('token')
    this.router.navigate([''])
  }
}
