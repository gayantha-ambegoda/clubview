import { Component, inject, OnInit } from '@angular/core';
import { Club, ClubRequest } from '../models/club';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ClubService } from '../services/club.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule,MatIconModule,MatButtonModule,MatToolbarModule,MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public dataSource : Club[] = []
  public displayedColumns: string[] = ['logo','name','shortName','description','countryCode','actions'];

  private clubService : ClubService = inject(ClubService)
  private router : Router = inject(Router)

  public name : string = ""
  public shortName : string = ""
  public description : string = ""
  public logo : string = ""
  public ccode : string = ""

  ngOnInit(): void {
    this.RefreshClubs()
  }

  SaveClub(){
    this.clubService.CreateClub({
      name:this.name,
      shortName:this.shortName,
      description:this.description,
      logo:this.logo,
      countryCode:this.ccode,
      status:1
    } as Club).subscribe({
      next:(response)=>{
        this.RefreshClubs()
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }

  RefreshClubs(){
    this.clubService.GetClubs().subscribe({
      next:(response)=>{
        this.dataSource = response
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  ViewClub(content : Club){
    this.router.navigate(['viewclub',content.id])
  }

  DeleteClub(content : Club){
    this.clubService.DeleteClub(content.id).subscribe({
      next:()=>{
        this.RefreshClubs()
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }
}
