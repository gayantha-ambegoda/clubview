import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FieldPart } from '../models/field-part';

@Injectable({
  providedIn: 'root'
})
export class FieldPartsService {

  constructor(private http : HttpClient) { }


  CreatePart(fieldPart : FieldPart){
    return this.http.post<FieldPart>('Parts',fieldPart);
  }

  GetFieldParts(fieldId : number){
    return this.http.get<FieldPart[]>(`Parts/FieldParts/${fieldId}`);
  }
}
