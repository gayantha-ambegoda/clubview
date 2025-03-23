import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Field } from '../models/fields';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private http : HttpClient) { }

  SaveField(request : Field){
    return this.http.post<Field>('Fields/Save',request);
  }

  GetFieldsByClub(clubId : number){
    return this.http.get<Field[]>(`Fields/FieldsByClub/${clubId}`);
  }

  GetField(id : number){
    return this.http.get<Field>(`Fields/${id}`)
  }
}
